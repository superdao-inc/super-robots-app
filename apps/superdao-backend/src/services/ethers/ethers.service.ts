import { Inject, Injectable } from '@nestjs/common';
import { BigNumber, Bytes, ethers } from 'ethers';

import Safe from '@gnosis.pm/safe-core-sdk';
import { MetaTransactionData, SafeTransaction, SafeTransactionDataPartial } from '@gnosis.pm/safe-core-sdk-types';
import { SafeTransactionOptionalProps } from '@gnosis.pm/safe-core-sdk/dist/src/utils/transactions/types';
import { CustomLogger } from '@dev/nestjs-common';
import { itx, config } from 'src/config';

import { feeService } from 'src/services/feeService';
import {
	InfuraTransaction,
	InfuraTransactionResponse,
	RelayTransactionStatusResponse
} from 'src/services/ethers/types';
import { EmailService } from '../email/email.service';

const {
	polygon: { chainId }
} = config;

const wait = (milliseconds: number) => {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

@Injectable()
export class EthersService {
	private readonly minimalTankBalance = config.balanceThreshold.relayTankDeposit;
	private readonly notifyEthersServiceBalance = config.balanceThreshold.ethersServiceSignerNotify;

	constructor(
		@Inject('ETHERS_WALLET') private readonly _signer: ethers.Wallet,
		@Inject('GNOSIS_SAFE_SDK') private readonly gnosisSafeSdk: Safe,
		private readonly emailService: EmailService,
		private logger: CustomLogger
	) {
		this.logger = logger.createScope(EthersService.name);

		this.logger.log(`EthersService started with wallet ${this._signer.address}`);
	}

	async checkSignerBalanceAndNotify() {
		const balanceEtherService = await this.signer.getBalance();
		const address = this.signer.address;
		const balanceMatic = ethers.utils.formatEther(balanceEtherService);

		this.logger.log(`Balance of the signer wallet ${address} is ${balanceMatic} MATIC`, {
			address,
			balanceMatic
		});

		const isBalanceBelowMinForNotify = balanceEtherService.lt(this.notifyEthersServiceBalance);

		if (isBalanceBelowMinForNotify) {
			try {
				void this.emailService.throttledSendTopUpWalletMessage(
					balanceMatic,
					ethers.utils.formatEther(this.notifyEthersServiceBalance),
					address,
					'signer'
				);
			} catch (ex) {
				this.logger.error(new Error('error on throttledSendTopUpWalletMessage'));
			}
		}

		const isBalanceBelowMinForDeposit = balanceEtherService.lt(this.minimalTankBalance);

		return isBalanceBelowMinForDeposit;
	}

	/**
	 * Printing relay transaction status
	 */
	private getBumpPrinter = () => {
		const bump = new Set<string>();

		return (txHash: string, price: any) => {
			if (!bump.has(txHash + price)) {
				bump.add(txHash + price);

				const gasPrise = `${ethers.utils.formatUnits(price, 'gwei')} gwei`;
				this.logger.log(`https://polygonscan.com/tx/${txHash} @ ${gasPrise}`);
			}
		};
	};

	/**
	 * 	Check your existing ITX balance.
	 * 	Balance is added by sending eth to the deposit address
	 * 	Balance is deducted everytime you send a relay transaction
	 * @private
	 */
	private async getItxTankBalance(): Promise<BigNumber> {
		const response = await itx.send('relay_getBalance', [this._signer.address]);
		const { balance } = response;

		return BigNumber.from(balance);
	}

	/**
	 * Send eth/matic to the ITX deposit address
	 * @private
	 */
	private async depositItxTank() {
		// get max fees from gas station
		const gas = await feeService.getGas();

		if (await this.checkSignerBalanceAndNotify()) {
			this.logger.log('Balance below the threshold, depositItxTank stopped');
			return;
		}

		let depositTx;
		const params = {
			// Address of the ITX deposit contract
			to: config.itx.deposit,
			// The amount of ether you want to deposit in your ITX gas tank
			value: this.minimalTankBalance,
			// Manually set the gas limit
			maxFeePerGas: gas.maxFeePerGas,
			maxPriorityFeePerGas: gas.maxPriorityFeePerGas,
			gasLimit: gas.gasLimit
		};

		try {
			depositTx = await this._signer.sendTransaction(params);
		} catch (ex) {
			this.logger.error(new Error('error on sendTransaction with params'), { ...params });
		}

		if (!depositTx) throw Error('depositTx undefined');

		this.logger.log('Mining deposit transaction...');
		this.logger.log(`https://polygonscan.com/tx/${depositTx.hash}`);

		// Waiting for the transaction to be mined
		const receipt = await depositTx.wait();

		// The transaction is now on chain!
		this.logger.log(`Mined in block ${receipt.blockNumber}`);
	}

	/**
	 * Check the ITX balance and deposit if needed
	 * @private
	 */
	private async beforeSendTransaction() {
		const balance = await this.getItxTankBalance();
		this.logger.log(`ITX tank balance: ${ethers.utils.formatEther(balance)}`);

		if (balance.lt(this.minimalTankBalance)) {
			const minDeposit = ethers.utils.formatEther(this.minimalTankBalance);
			this.logger.log(`ITX balance is below ${minDeposit} MATICs, depositing...`);
			await this.depositItxTank();
		}
	}

	/**
	 * 	Sign a relay request using the signer's private key
	 * 	Final signature of the form keccak256("\x19Ethereum Signed Message:\n" + len((to + data + gas + chainId + schedule)) + (to + data + gas + chainId + schedule)))
	 * 	Where (to + data + gas + chainId + schedule) represents the ABI argument encoding of these fields.
	 * 	ITX will check the from address of this signature and deduct balance according to the gas used by the transaction
	 * @param infuraTransaction
	 */
	private signRelayTransactionHash(infuraTransaction: InfuraTransaction): Promise<string> {
		const { to, data, gas, schedule } = infuraTransaction;

		const relayTransactionHashToSign = ethers.utils.keccak256(
			ethers.utils.defaultAbiCoder.encode(
				['address', 'bytes', 'uint', 'uint', 'string'],
				[to, data, gas, chainId, schedule]
			)
		);
		const arrayifyHash = ethers.utils.arrayify(relayTransactionHashToSign);

		return this.signMessage(arrayifyHash);
	}

	/**
	 * Process gnosis safe transaction
	 * @param transaction
	 * @param gnosisSafeSdk
	 * @private
	 */
	private async processGnosisTransaction(transaction: SafeTransaction, gnosisSafeSdk: Safe): Promise<string> {
		try {
			const [gas, gasPrice, providerNonce] = await Promise.all([
				feeService.getGas(),
				this.getGasPrice(),
				this.signer.getTransactionCount()
			]);

			const signedSafeTransaction = await gnosisSafeSdk.signTransaction(transaction);

			// increase gas price by 20% to avoid underpriced transactions
			const increaseGasPrice = gasPrice.mul(120).div(100);

			const txResult = await gnosisSafeSdk!.executeTransaction(signedSafeTransaction, {
				gasPrice: increaseGasPrice.toString(),

				// Manually set nonce to avoid nonce collision
				nonce: providerNonce,

				// Manually set the gas limit
				gasLimit: gas.gasLimit
			});

			return txResult.hash;
		} catch (e) {
			throw e;
		}
	}

	/**
	 * Get signer
	 */
	public get signer() {
		return this._signer;
	}

	/**
	 * Get gas price
	 */
	public async getGasPrice() {
		return await this._signer.getGasPrice();
	}

	/**
	 * Sign a message using the signer's private key
	 * @param message
	 */
	public async signMessage(message: Bytes | string): Promise<string> {
		return this._signer.signMessage(message);
	}

	/**
	 * Sending a gnosis safe transaction
	 * @param safeTransactions
	 */
	public async sendGnosisSafeTransaction(safeTransactions: SafeTransactionDataPartial): Promise<string> {
		if (!this.gnosisSafeSdk) throw new Error('Gnosis Safe SDK is not initialized');

		try {
			const gnosisSafeTransaction = await this.gnosisSafeSdk.createTransaction(safeTransactions);

			return await this.processGnosisTransaction(gnosisSafeTransaction, this.gnosisSafeSdk);
		} catch (e) {
			this.logger.error(new Error('Error while sending Gnosis Safe transaction'), { e });
			throw e;
		}
	}

	/**
	 * Sending multiple gnosis safe transactions as batch
	 * @param safeTransactions
	 * @param options
	 */
	public async sendGnosisSafeMultiTransaction(
		safeTransactions: MetaTransactionData[],
		options?: SafeTransactionOptionalProps
	): Promise<string> {
		if (!this.gnosisSafeSdk) throw new Error('Gnosis Safe SDK is not initialized');

		try {
			const gnosisSafeTransaction = await this.gnosisSafeSdk.createTransaction(safeTransactions, options);

			return await this.processGnosisTransaction(gnosisSafeTransaction, this.gnosisSafeSdk);
		} catch (e) {
			this.logger.error(new Error('Error while sending Gnosis Safe transaction'), { e });
			throw e;
		}
	}

	/**
	 * Send a transaction to the blockchain using Infura's ITX service
	 * @param transaction
	 * @param encodedFunctionData
	 */
	public async sendItxTransaction(
		transaction: ethers.PopulatedTransaction | ethers.ContractTransaction
	): Promise<InfuraTransactionResponse> {
		this.logger.log('Sending ITX transaction...');
		if (!transaction.to) throw new Error('Transaction must have a "to" address');
		if (!transaction.data) throw new Error('Transaction must have a "data"');
		await this.beforeSendTransaction();

		// get max fees from gas station
		const gas = await feeService.getGas();

		// build the transaction object
		const infuraTransaction: InfuraTransaction = {
			to: transaction.to,
			data: transaction.data,
			gas: transaction.gasLimit?.toString() || gas.gasLimit.toString(10),
			schedule: 'fast'
		};

		// Sign the relay request
		const signature = await this.signRelayTransactionHash(infuraTransaction);
		this.logger.log('Relay transaction signed', { signature });

		// Relay the transaction through ITX
		const sentAtBlock = await itx.getBlockNumber(); // Stats
		this.logger.log('Sent at block:', { sentAtBlock });

		let response: InfuraTransactionResponse;
		try {
			response = await itx.send('relay_sendTransaction', [infuraTransaction, signature]);
		} catch (ex) {
			this.logger.error(ex as Error);
			throw Error('Error when relay_sendTransaction');
		}
		this.logger.log('Relay response:', { response });

		return response;
	}

	public async waitItxTransaction(relayTxhash: string) {
		try {
			// bump logger:
			const printBump = this.getBumpPrinter();

			while (true) {
				const statusResponse: RelayTransactionStatusResponse = await itx.send('relay_getTransactionStatus', [
					relayTxhash
				]);
				const { broadcasts } = statusResponse;

				// check each of these hashes to see if their receipt exists and has confirmations
				if (broadcasts) {
					for (const broadcast of broadcasts) {
						const { ethTxHash, gasPrice } = broadcast;
						const receipt = await itx.getTransactionReceipt(ethTxHash);

						printBump(ethTxHash, gasPrice); // Print bump

						if (receipt && receipt.confirmations && receipt.confirmations > 1) {
							// The transaction is now on chain!
							this.logger.log('The transaction is now on chain', {
								ethTxHash: receipt.transactionHash,
								blockNumber: receipt.blockNumber
							});

							return true;
						}
					}
				}

				await wait(1000);
			}
		} catch (e) {
			return false;
		}
	}

	public async checkItxTransaction(relayTxhash: string) {
		try {
			const statusResponse: RelayTransactionStatusResponse = await itx.send('relay_getTransactionStatus', [
				relayTxhash
			]);
			const { broadcasts } = statusResponse;

			// check each of these hashes to see if their receipt exists and has confirmations
			if (broadcasts) {
				for (const broadcast of broadcasts) {
					const { ethTxHash } = broadcast;
					const receipt = await itx.getTransactionReceipt(ethTxHash);

					if (receipt && receipt.confirmations && receipt.confirmations > 1) {
						// The transaction is now on chain!
						this.logger.log('The transaction is now on chain', {
							ethTxHash: receipt.transactionHash,
							blockNumber: receipt.blockNumber
						});

						return true;
					}
				}
			}

			return false;
		} catch (e) {
			return false;
		}
	}

	public async getFinalizedItxTransactionStatus(relayTxhash: string) {
		try {
			const statusResponse: RelayTransactionStatusResponse = await itx.send('relay_getTransactionStatus', [
				relayTxhash
			]);
			const { broadcasts } = statusResponse;

			// check each of these hashes to see if their receipt exists and has confirmations
			if (broadcasts) {
				for (const broadcast of broadcasts) {
					const { ethTxHash } = broadcast;
					const receipt = await itx.getTransactionReceipt(ethTxHash);

					if (receipt && receipt.confirmations && receipt.confirmations > 1) {
						// The transaction is now on chain!
						this.logger.log('The transaction is on chain with status', {
							ethTxHash: receipt.transactionHash,
							status: !!receipt.status
						});

						return !!receipt.status; // 1 if success 0 if fail
					}
				}
			}

			return false;
		} catch (e) {
			return false;
		}
	}

	/**
	 * Send a transaction to the blockchain
	 * @param transaction
	 * @param nonce
	 * @deprecated use sendItxTransaction instead
	 */
	public async sendTransaction(
		transaction: ethers.PopulatedTransaction | ethers.ContractTransaction,
		nonce?: number
	): Promise<ethers.providers.TransactionResponse> {
		const from = await this._signer.getAddress();
		const changedFromTx = { ...transaction, type: transaction.type ?? undefined, from };

		// get max fees from gas station
		const gas = await feeService.getGas();

		return this._signer.sendTransaction({
			...changedFromTx,
			maxFeePerGas: gas.maxFeePerGas,
			maxPriorityFeePerGas: gas.maxPriorityFeePerGas,
			gasLimit: transaction.gasLimit || gas.gasLimit, // Gas estimated intentionally, use it
			nonce
		});
	}
}
