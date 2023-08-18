import { ethers, PopulatedTransaction } from 'ethers';
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers';
import { TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider';

import { DisconnectError } from 'src/providers/walletProvider/types';
import { MetaTxParams } from '@sd/superdao-shared';

/**
 * Base class for wallet providers. Must be extended by all wallet providers.
 */
export abstract class BaseWalletApi {
	private readonly _web3Provider: Web3Provider;

	protected constructor(provider: ExternalProvider | JsonRpcFetchFunc) {
		this._web3Provider = new ethers.providers.Web3Provider(provider, 'any');
	}

	async enableProvider(): Promise<void> {
		// @ts-expect-error
		const enable = this._web3Provider.provider.enable;

		if (typeof enable === 'function') {
			// @ts-expect-error
			await this._web3Provider.provider.enable();
		}
	}

	async sendTransaction(transaction: any) {
		this.checkHealth(this._web3Provider);

		// Is needed to authorise user with his wallet if he has changed anything (for example, account) after the app initialization.
		await this.enableProvider();

		const parsedTx = this.mapTransactionToTransactionRequest(transaction);

		return this.signer.sendTransaction(parsedTx);
	}

	async sendPopulatedTransaction(transaction: PopulatedTransaction) {
		this.checkHealth(this._web3Provider);

		// Is needed to authorise user with his wallet if he has changed anything (for example, account) after the app initialization.
		await this.enableProvider();

		return this.signer.sendTransaction(transaction);
	}

	async sendMetaTransaction(_metaTxParams: MetaTxParams): Promise<TransactionResponse | undefined> {
		// const { message, domain, types } = metaTxParams;
		// this.checkHealth(this._web3Provider);
		// await this.enableProvider();
		// const signer = this._web3Provider.getSigner();
		// const signature = await signer._signTypedData(domain, types, message);
		// const response = await useSendMetaTransactionMutation.fetcher({
		// 	SendMetaTxParamsInput: { message, signature }
		// })();
		// return response?.sendMetaTransaction as unknown as TransactionResponse;

		return;
	}

	abstract get chainId(): number | undefined;
	abstract getAccount(): Promise<string | undefined>;

	abstract isAvailable(): boolean;

	/*
	 * @desc: Checks if the wallet provider is connected to blockchain
	 */
	abstract isConnected(): boolean;

	/*
	 * Events(EIP-1193) which must be called from external code
	 */
	abstract onAccountChanged(callback: (account: string | undefined) => void): void;
	abstract onChainChanged(callback: (chainId: number) => void): void;
	abstract onConnect(callback: (chainId: number) => void): void;
	abstract onDisconnect(callback: (error: DisconnectError) => void): void;

	/*
	 * @desc: Unsubscribe from all events
	 */
	abstract unsubscribeFromEvents(): void;

	private checkHealth(web3Provider: Web3Provider | undefined): asserts web3Provider is Web3Provider {
		if (!web3Provider) throw new Error('Web3 provider is not initialized');
		if (!this.isAvailable()) throw new Error('Wallet Provider is not available');
		if (!this.isConnected()) throw new Error('Wallet is not connected to blockchain');
	}

	private mapTransactionToTransactionRequest(transaction: any): TransactionRequest {
		const {
			to,
			from,
			nonce,
			gasLimit,
			gasPrice,
			data,
			value,
			chainId,
			type,
			accessList,
			maxFeePerGas,
			maxPriorityFeePerGas
		} = transaction;

		return {
			to: to ?? undefined,
			from: from ?? undefined,
			nonce: nonce ?? undefined,

			gasLimit: gasLimit?.hex,
			gasPrice: gasPrice?.hex,

			data: data ?? undefined,
			value: value?.hex,
			chainId: chainId ?? undefined,

			type: type || undefined,
			accessList: accessList ?? undefined,

			maxPriorityFeePerGas: maxPriorityFeePerGas?.hex,
			maxFeePerGas: maxFeePerGas?.hex
		};
	}

	public get web3Provider() {
		return this._web3Provider;
	}

	public get signer(): ethers.providers.JsonRpcSigner {
		return this._web3Provider.getSigner();
	}
}
