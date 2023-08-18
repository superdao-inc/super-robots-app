import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

import { CustomLogger } from '@dev/nestjs-common';
import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers';
import { Contract } from 'ethers';
import { config, provider } from 'src/config';

import { Erc721MintParticipant } from './erc721MintWorker.types';
import { CONFIRMATIONS_COUNT, erc721BabyRobotMintAbi } from './erc721MintWorker.constants';
import { BabyRobotService } from 'src/entities/babyRobot/babyRobot.service';
import { EmailService } from '../email/email.service';

export const SORTED_SET_KEY = config.erc721Mint.ERC_721_MINT_SORTED_SET_KEY;
export const ACTIVE_TX_KEY = config.erc721Mint.ERC_721_MINT_ACTIVE_TX_KEY;

@Injectable()
export class Erc721MintWorkerHelper {
	private readonly contract;

	constructor(
		private readonly babyRobotService: BabyRobotService,
		private readonly emailService: EmailService,
		@InjectRedis() private readonly redis: Redis,
		private logger: CustomLogger
	) {
		this.logger = logger.createScope(Erc721MintWorkerHelper.name);

		this.contract = new Contract(config.robots.erc721BabyRobotContractAddress, erc721BabyRobotMintAbi, provider);
	}

	async returnParticipantsToPool(participants: Erc721MintParticipant[]) {
		const scoreValuePairs = participants.reduce((acc, participant) => {
			acc.push(0);
			acc.push(JSON.stringify(participant));

			return acc;
		}, [] as any[]);

		await this.redis.zadd(SORTED_SET_KEY, ...scoreValuePairs);
	}

	async processBatchMint(tx: TransactionResponse, txHash: string, participants: Erc721MintParticipant[]) {
		try {
			await this.babyRobotService.startErc721MintBabyRobot(
				participants.map((participant) => {
					return {
						mintId: participant.mintId,
						wallet: participant.walletAddress,
						transactionHash: txHash
					};
				})
			);
		} catch (e) {
			this.logger.error(new Error('Error while saving start mint data to db'), { txHash, e });
		}

		let txReceipt;

		try {
			// TODO: timeout
			txReceipt = await tx.wait(CONFIRMATIONS_COUNT);
		} catch (e) {
			this.logger.error(new Error('transaction with hash was not waited succcessfully'), { txHash, e });

			await this.returnParticipantsToPool(participants);

			await this.redis.del(ACTIVE_TX_KEY);

			return false;
		}

		this.logger.log('erc721 mint activeTx status', {
			status: txReceipt.status
		});

		const isTxSuccessful = !!txReceipt.status;
		if (!isTxSuccessful) {
			this.logger.error(new Error('transaction with hash was not mined succcessfully'), { txHash });

			await this.returnParticipantsToPool(participants);

			await this.redis.del(ACTIVE_TX_KEY);

			return false;
		}

		this.logger.log('transaction with hash was mined succcessfully', { txHash });

		try {
			await this.handleBatchMintSuccess(txReceipt, participants);
		} catch (e) {
			this.logger.error(new Error('Error while handling success mint data'), { e });
		}

		return true;
	}

	parseTransactionReceiptLogs(receipt: TransactionReceipt) {
		const logs = receipt.logs.filter(
			(log) => log.address.toLowerCase() === config.robots.erc721BabyRobotContractAddress.toLowerCase()
		);

		return logs.map((log) => {
			const parseResult = this.contract.interface.decodeEventLog('Transfer', log.data, log.topics); // [from, to, tokenId]

			return {
				wallet: parseResult[1].toLowerCase(),
				tokenId: BigInt(parseResult[2]).toString()
			};
		});
	}

	async handleBatchMintSuccess(receipt: TransactionReceipt, participants: Erc721MintParticipant[]) {
		const walletsAndTokensMap = this.parseTransactionReceiptLogs(receipt);

		const data = participants.map((participant) => {
			const logsData = walletsAndTokensMap.find(
				(data) => data.wallet.toLowerCase() === participant.walletAddress.toLowerCase()
			);

			return {
				mintId: participant.mintId,
				wallet: logsData?.wallet ?? participant.walletAddress,
				email: participant.email,
				imageNameSha: participant.imageNameSha,
				tokenId: logsData?.tokenId
			};
		});

		this.logger.log('Saving to db mint finilize data', { data, tokens: data.map((entry) => entry.tokenId) });

		await this.babyRobotService.finalizeErc721MintBabyRobot(data);

		await this.emailService.sendErc721MintSuccessMessage(
			data.filter((entry) => entry.email).map((entry) => entry.email),
			data.reduce((acc, val) => {
				acc[val.email] = { ...val };

				return acc;
			}, {} as Record<string, typeof data[0]>)
		);
	}
}
