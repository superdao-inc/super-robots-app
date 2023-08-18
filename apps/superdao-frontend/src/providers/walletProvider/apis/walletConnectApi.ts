import { EthereumProvider } from '@walletconnect/ethereum-provider';

// base interface
import { config } from 'src/constants';
import { BaseWalletApi } from 'src/providers/walletProvider/apis/baseWalletApi';

// constants

// shared
import { Chain, networkMap } from '@sd/superdao-shared';

// types
import { DisconnectError } from 'src/providers/walletProvider/types';

/*
 * WalletConnect
 * @desc: WalletConnect supported wallets map
 * NOTE: some wallets just doesn't work
 */

/**
 * Class provides wallet connect api.
 */
export class WalletConnectApi extends BaseWalletApi {
	private _walletConnectProvider: any;

	public static async getInstance() {
		const walletConnectProvider = await EthereumProvider.init({
			projectId: config.walletConnect.projectId,
			showQrModal: true,
			rpcMap: {
				[Chain.Polygon]: networkMap[Chain.Polygon].rpcUrls[0]
			},
			chains: [config.polygon.chainId]
		});

		const walletConnectApi = new WalletConnectApi(walletConnectProvider);

		walletConnectApi._walletConnectProvider = walletConnectProvider;

		return walletConnectApi;
	}

	isConnected(): boolean {
		return this._walletConnectProvider.connected;
	}

	isAvailable(): boolean {
		return true;
	}

	onAccountChanged(callback: (account: string | undefined) => void) {
		this._walletConnectProvider.on('accountsChanged', (accounts: string[]) => {
			if (!Array.isArray(accounts)) return;

			if (Array.isArray(accounts) && typeof accounts[0] !== 'string') return;

			if (accounts.length === 0) {
				callback(undefined);
			} else if (accounts[0].toLowerCase() !== '') {
				callback(accounts[0].toLowerCase());
			}
		});
	}

	onChainChanged(callback: (chainId: number) => void) {
		this._walletConnectProvider.on('chainChanged', (_: any, chainId: string) => callback(Number(chainId)));
	}

	onConnect(callback: (chainId: number) => void) {
		this._walletConnectProvider.on('connect', (_: any, chainId: string) => callback(Number(chainId)));
	}

	onDisconnect(callback: (error: DisconnectError) => void) {
		this._walletConnectProvider.on('disconnect', (error: any) => callback(new DisconnectError(error?.message)));
	}

	// Looks like this wallet connect will unsubscribe from all events by itself
	unsubscribeFromEvents() {}

	async getAccount(): Promise<string | undefined> {
		return this._walletConnectProvider.accounts[0]?.toLowerCase();
	}

	get chainId(): number | undefined {
		return this._walletConnectProvider.chainId;
	}
}
