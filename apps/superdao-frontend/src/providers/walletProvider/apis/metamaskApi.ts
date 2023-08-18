import { MetaMaskInpageProvider } from '@metamask/providers';

// base interface
import detectEthereumProvider from '@metamask/detect-provider';
import { BaseWalletApi } from 'src/providers/walletProvider/apis/baseWalletApi';

// types
import { DisconnectError } from 'src/providers/walletProvider/types';

/**
 * Class provides the metamask wallet api.
 */
export class MetamaskApi extends BaseWalletApi {
	private _metamaskProvider: MetaMaskInpageProvider;

	public static async getInstance(): Promise<MetamaskApi | undefined> {
		const metamaskProvider = (await detectEthereumProvider({
			mustBeMetaMask: true,
			timeout: 200
		})) as MetaMaskInpageProvider | null;

		if (!metamaskProvider) return undefined;

		const metamaskAPI = new MetamaskApi(metamaskProvider as any);

		metamaskAPI._metamaskProvider = metamaskProvider;

		return metamaskAPI;
	}

	isConnected(): boolean {
		return !!this._metamaskProvider?.isConnected();
	}

	isAvailable(): boolean {
		return !!this._metamaskProvider;
	}

	onAccountChanged(callback: (account: string | undefined) => void) {
		this._metamaskProvider.on('accountsChanged', (accounts) => {
			if (!Array.isArray(accounts) || typeof accounts[0] !== 'string' || !accounts[0]?.trim()) return undefined;

			callback(accounts[0].trim().toLowerCase());
		});
	}

	onChainChanged(callback: (chainId: number) => void) {
		this._metamaskProvider.on('chainChanged', (chainId) => callback(Number(chainId)));
	}

	onConnect(callback: (chainId: number) => void) {
		this._metamaskProvider.on('connect', (chainId) => callback(Number(chainId)));
	}

	onDisconnect(callback: (error: DisconnectError) => void) {
		this._metamaskProvider.on('disconnect', (error) => callback(error as DisconnectError));
	}

	unsubscribeFromEvents() {
		this._metamaskProvider.removeAllListeners();
	}

	get chainId(): number | undefined {
		return Number(this._metamaskProvider.chainId);
	}
	async getAccount(): Promise<string | undefined> {
		return this._metamaskProvider.selectedAddress?.toLowerCase();
	}
}
