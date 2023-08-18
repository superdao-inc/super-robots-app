import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';

// Types
import { PopulatedTransaction } from 'ethers';
import { WalletType } from 'src/types/wallet';
import { DisconnectError, WalletApiState } from 'src/providers/walletProvider/types';

// APIs
import { MetamaskApi } from 'src/providers/walletProvider/apis/metamaskApi';
import { WalletConnectApi } from 'src/providers/walletProvider/apis/walletConnectApi';
import { BaseWalletApi } from 'src/providers/walletProvider/apis/baseWalletApi';
import { MetaTxParams } from '@sd/superdao-shared';

interface OnWalletApiChange {
	(walletData: WalletApiState): void;
}

/**
 * WalletApi is a singleton class that provides a unified interface for interacting with different wallet providers.
 */
export class WalletApi {
	private api: BaseWalletApi | undefined;
	private static _instance: WalletApi | undefined;

	public onInnerStateChange: OnWalletApiChange;

	private constructor() {}

	public static async getInstance(onWalletApiChangeCallback: OnWalletApiChange): Promise<WalletApi> {
		if (WalletApi._instance) {
			return WalletApi._instance;
		}

		const walletApi = new WalletApi();
		walletApi.onInnerStateChange = onWalletApiChangeCallback;

		await walletApi.initialize();

		WalletApi._instance = walletApi;

		return walletApi;
	}

	public async initialize(walletType?: string): Promise<void> {
		const lastUsedWalletType = localStorage.getItem('walletType') as WalletType | undefined;

		const chosenWalletType = walletType || lastUsedWalletType;

		if (chosenWalletType) {
			const concreteWalletAPI = await this.getConcreteWalletAPI(chosenWalletType);

			if (concreteWalletAPI) {
				localStorage.setItem('walletType', chosenWalletType);

				this.api = concreteWalletAPI;
				await this.api.enableProvider();
				this.subscribeToEvents();
			}
		}

		/*
		Call notify() anyway.
		This is also needed when WalletApi.getInstance() is called to notify React about walletApi state change after construction.
		Don't move notify inside `if (concreteWalletAPI) {}` block.
		*/
		void this.notifyAboutInnerStateChange();
	}

	connectTo = async (walletType: WalletType): Promise<Web3Provider | undefined> => {
		if (typeof window === 'undefined') return;

		await this.initialize(walletType);

		return this.api?.web3Provider;
	};

	sendTransaction = async (tx: any) => this.api?.sendTransaction(tx);

	sendPopulatedTransaction = async (tx: PopulatedTransaction) => this.api?.sendPopulatedTransaction(tx);

	sendMetaTransaction = async (req: MetaTxParams) => this.api?.sendMetaTransaction(req);

	clear = () => {
		if (typeof window === 'undefined') return;

		this.unsubscribeFromEvents();

		this.api = undefined;

		localStorage.removeItem('walletType');

		void this.notifyAboutInnerStateChange();
	};

	/**
	 * Call the after logging into magic link account. Magic link doesn't give "logged in" event,
	 * so calling this method directly is the only way to update the magicLink account in walletApi state.
	 */
	onMagicLinkAuthorised = () => {
		this.notifyAboutInnerStateChange();
	};

	/**
	 * Calls the onInnerStateChange() callback to notify the react component.
	 */
	private async notifyAboutInnerStateChange() {
		/*
		We need to return some data that will trigger React to change it's state and rerender.

		We could call 'onInnerStateChange(this)'. However, this would return the same link to WalletApi class
		and the React state wouldn't change. This is because React uses Object.is() to define whether the state has changed.

		Whereas returning an object literal {} will trigger the React state change as Object.is({}, {}) === false.
		 */
		this.onInnerStateChange(await this.getWalletApiState());
	}

	/**
	 * Returns an object with WalletApi inner state.
	 */
	private async getWalletApiState(): Promise<WalletApiState> {
		const currentAccount = await this.getCurrentAccount();
		return {
			currentAccount,
			chainId: this.chainId,
			web3Provider: this.web3Provider,
			signer: this.signer,
			connectTo: this.connectTo,
			clear: this.clear,
			sendPopulatedTransaction: this.sendPopulatedTransaction,
			sendTransaction: this.sendTransaction,
			sendMetaTransaction: this.sendMetaTransaction,
			onMagicLinkAuthorised: this.onMagicLinkAuthorised
		};
	}

	private subscribeToEvents = (): void => {
		if (!this.api) return;

		this.api.onAccountChanged(() => {
			this.notifyAboutInnerStateChange();
		});

		this.api.onChainChanged(() => this.notifyAboutInnerStateChange());

		this.api.onConnect(() => this.notifyAboutInnerStateChange());

		this.api.onDisconnect((error: DisconnectError) => console.log('disconnect', error));
	};

	private unsubscribeFromEvents(): void {
		this.api?.unsubscribeFromEvents();
	}

	private async getConcreteWalletAPI(walletType: string): Promise<BaseWalletApi | undefined> {
		if (typeof window === 'undefined') return undefined;

		switch (walletType) {
			case 'metamask': {
				return MetamaskApi.getInstance();
			}

			case 'walletconnect': {
				return WalletConnectApi.getInstance();
			}

			default: {
				return undefined;
			}
		}
	}

	async getCurrentAccount(): Promise<string | undefined> {
		return this.api?.getAccount();
	}

	get chainId(): number | undefined {
		return this.api?.chainId;
	}

	get web3Provider(): Web3Provider | undefined {
		return this.api?.web3Provider;
	}

	get signer(): JsonRpcSigner | undefined {
		return this.api?.signer;
	}
}
