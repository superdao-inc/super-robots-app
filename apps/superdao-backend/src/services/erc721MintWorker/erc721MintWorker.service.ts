import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import Redis from 'ioredis';

import { CustomLogger } from '@dev/nestjs-common';

import { Contract } from 'ethers';
import { ACTIVE_TX_KEY, Erc721MintWorkerHelper, SORTED_SET_KEY } from './erc721MintWorker.helper';
import { Erc721MintParticipant } from './erc721MintWorker.types';
import { config, provider } from 'src/config';
import { MAX_BATCH_SIZE, MAX_GAS_PRICE, erc721BabyRobotMintAbi } from './erc721MintWorker.constants';
import { feeService } from 'src/services/feeService';
import { featureToggles } from '../featureToggles';
import { EthersService } from '../ethers/ethers.service';

@Injectable()
export class Erc721MintWorkerService {
	private lock = false; // to block starting batch minting in session vision

	constructor(
		@Inject('ETHERS_SERVICE_REWARD_AIRDROP') private readonly airdropEthersService: EthersService,
		@InjectRedis() private readonly redis: Redis,
		private readonly erc721MintWorkerHelper: Erc721MintWorkerHelper,
		private logger: CustomLogger
	) {
		this.logger = logger.createScope(Erc721MintWorkerService.name);
	}

	async tryBatchMint() {
		try {
			if (this.lock) return;

			this.lock = true;

			const activeTxData = await this.redis.get(ACTIVE_TX_KEY);

			if (!activeTxData) {
				const participantsCount = await this.redis.zcard(SORTED_SET_KEY);

				if (!participantsCount) {
					this.lock = false;
					return;
				}

				this.logger.log('erc721 mint must be started');

				this.batchMint() // fire and forget
					.catch((e) => {
						this.logger.error(new Error('erc721 mint attempt error'), { e });
					})
					.finally(() => (this.lock = false));

				return;
			}

			const {
				txHash,
				participants
			}: {
				txHash: string;
				participants: Erc721MintParticipant[];
			} = JSON.parse(activeTxData);

			const tx = await provider.getTransaction(txHash);

			const result = await this.erc721MintWorkerHelper.processBatchMint(tx, txHash, participants);
			if (!result) {
				this.lock = false;

				return;
			}

			this.lock = false;

			await this.redis.del(ACTIVE_TX_KEY);
		} catch (e) {
			this.lock = false;

			this.logger.error(new Error('erc721 mint attempt error'), { e });

			return;
		}
	}

	async batchMintRobotsErc721(participants: Erc721MintParticipant[]) {
		const contract = new Contract(config.robots.erc721BabyRobotContractAddress, erc721BabyRobotMintAbi, provider);

		const transformedParticipants = participants.map((participant) => participant.walletAddress);

		const txData = await contract.populateTransaction['mint'](transformedParticipants);

		const gas = await feeService.getGas();

		const tx = await this.airdropEthersService.signer.sendTransaction({
			...txData,
			maxFeePerGas: gas.maxFeePerGas,
			maxPriorityFeePerGas: gas.maxPriorityFeePerGas,
			gasLimit: gas.gasLimit
		});

		return tx;
	}

	async batchMint() {
		const gas = await feeService.getGas();
		if (MAX_GAS_PRICE.lt(gas.maxFeePerGas)) {
			this.logger.log('erc721 mint attempt stopped: too high gas', { gas: gas.maxFeePerGas.toString() });
			return;
		}

		const batchTimestamp = Date.now();

		let parsedParticipants: Erc721MintParticipant[] = [];

		try {
			const participants = await this.redis.zpopmin(SORTED_SET_KEY, MAX_BATCH_SIZE); // here will be [Erc721MintParticipant, number][] ([{}, 1679647335799, {}, 1679647335799]) because zpopmin return sort values

			parsedParticipants = participants
				.map((participant) => JSON.parse(participant))
				.filter((participant) => !!participant.walletAddress); // xo we need to filter only Erc721MintParticipant

			const tx = await this.batchMintRobotsErc721(parsedParticipants);

			this.logger.log(`transaction: https://polygonscan.com/tx/${tx.hash}`);

			await this.redis.set(ACTIVE_TX_KEY, JSON.stringify({ txHash: tx.hash, participants: parsedParticipants }));

			await this.erc721MintWorkerHelper.processBatchMint(tx, tx.hash, parsedParticipants);
		} catch (e) {
			this.logger.error(new Error('Error while erc721 batch minting'), {
				parsedParticipants,
				batchTimestamp,
				e
			});

			await this.erc721MintWorkerHelper.returnParticipantsToPool(parsedParticipants);
		} finally {
			await this.redis.del(ACTIVE_TX_KEY);
		}
	}

	@Cron(CronExpression.EVERY_10_SECONDS)
	async cronTryBatchMint() {
		if (!featureToggles.isEnabled('erc721_mint_worker')) return;

		this.logger.log('Cron erc721 mint attempt started');
		await this.tryBatchMint();
		this.logger.log('Cron erc721 mint attempt finished');
	}
}
