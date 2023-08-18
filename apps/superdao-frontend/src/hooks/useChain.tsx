import { useCallback, useMemo } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useTranslation } from 'next-i18next';
import { config } from 'src/constants';
import { Chain, ChainProps, networkMap } from '@sd/superdao-shared';

import { toast } from 'src/components/toast/toast';
import { MetamaskErrorCode } from 'src/constants/errorCodes';
import { useWallet } from 'src/providers/walletProvider';

export const WRONG_CHAIN_TOAST_ID = 'WRONG_CHAIN_TOAST';
export const CHAIN_ID = config.polygon.chainId;

/**
 * @see https://docs.metamask.io/guide/rpc-api.html#unrestricted-methods
 */
type AddEthereumChainParameter = {
	chainId: `0x${string}`;
	chainName: string;
	nativeCurrency: {
		name: string;
		symbol: string; // 2-6 characters long
		decimals: number;
	};
	rpcUrls: string[];
	blockExplorerUrls?: string[];
	iconUrls?: string[]; // Currently ignored.
};
const mapChainPropsToMetamask = (chainProps: ChainProps): AddEthereumChainParameter => {
	return {
		chainId: chainProps.chainIdHex,
		chainName: chainProps.fullName,
		nativeCurrency: chainProps.nativeCurrency,
		rpcUrls: chainProps.rpcUrls,
		blockExplorerUrls: chainProps.blockExplorerUrls
	};
};

const requestChainSwitch = async (web3Provider: Web3Provider, chain: Chain) => {
	const { provider } = web3Provider;
	const chainProps = networkMap[chain];

	if (typeof provider.request !== 'function') throw new Error('Provider does not support request');

	try {
		await provider.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: chainProps.chainIdHex }]
		});
	} catch (error: any) {
		if (error.code === MetamaskErrorCode.CHAIN_HAS_NOT_BEEN_ADDED && chain !== Chain.Ethereum) {
			await provider.request({
				method: 'wallet_addEthereumChain',
				params: [mapChainPropsToMetamask(chainProps)]
			});
			return;
		}

		throw error;
	}
};

export const useChain = () => {
	const { t } = useTranslation();
	const { chainId, web3Provider } = useWallet();

	const switchChain = useCallback(
		async (chain: Chain) => {
			if (!web3Provider) throw new Error(t('errors.noProvider'));
			if (chain === chainId) return;

			toast.loading(t('toasts.wrongChain.attempting'), {
				id: WRONG_CHAIN_TOAST_ID
			});

			let timeoutId: ReturnType<typeof setTimeout>;

			// Promise.race allows to cancel hung promise
			await Promise.race([
				new Promise((_, reject) => {
					timeoutId = setTimeout(reject, 15000);
				}),
				requestChainSwitch(web3Provider, chain)
			])
				.then(() => {
					toast.dismiss(WRONG_CHAIN_TOAST_ID);
				})
				.catch(() => {
					toast.error(t('toasts.wrongChain.error'), {
						id: WRONG_CHAIN_TOAST_ID
					});
				})
				.finally(() => {
					clearTimeout(timeoutId);
				});
		},
		[web3Provider, chainId, t]
	);

	return useMemo(() => ({ switchChain, chainId }), [switchChain, chainId]);
};
