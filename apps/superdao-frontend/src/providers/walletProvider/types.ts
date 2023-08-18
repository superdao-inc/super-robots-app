import { Web3Provider } from '@ethersproject/providers';
import { ethers, PopulatedTransaction } from 'ethers';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { WalletType } from 'src/types/wallet';
import { MetaTxParams } from '@sd/superdao-shared/';

export type WalletContextType = {
	web3Provider?: Web3Provider;
	signer?: ethers.providers.JsonRpcSigner;
	connectTo(walletType: WalletType): Promise<Web3Provider | undefined>;
	sendTransaction(tx: any): Promise<TransactionResponse | undefined>;
	sendPopulatedTransaction(tx: PopulatedTransaction): Promise<TransactionResponse | undefined>;
	sendMetaTransaction: (
		options: MetaTxParams
	) => Promise<Omit<TransactionResponse, 'confirmations' | 'wait'> | undefined>;
	canSendMetaTransaction: () => boolean;
	onMagicLinkAuthorised(): void;
	clear: () => void;
	chainId?: number;
	currentAccount?: string;
};

export type WalletApiState = Omit<WalletContextType, 'canSendMetaTransaction'>;

export class DisconnectError extends Error {
	readonly message: string;
	readonly code: number;

	constructor(message: string = 'Disconnect', code: number = 4001) {
		super();

		this.message = message;
		this.code = code;
	}
}
