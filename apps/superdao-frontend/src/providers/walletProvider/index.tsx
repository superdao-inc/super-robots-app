import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { WalletType } from 'src/types/wallet';

import { useMetamaskAccountChange } from 'src/features/auth/hooks/useMetamaskAccountChange';
import { useCurrentUserQuery } from 'src/features/user/hooks/useCurrentUserQuery';
import { WalletApi } from 'src/providers/walletProvider/walletApi';
import { toast } from 'src/components/toast';
import { useIsAuthorized } from 'src/features/auth/hooks/useIsAuthorized';
import { useLogout } from 'src/features/auth/hooks/useLogout';
import { WalletApiState, WalletContextType } from 'src/providers/walletProvider/types';

const WALLET_CONTEXT_DEFAULT_VALUE = {
	currentAccount: undefined,
	chainId: undefined,
	web3Provider: undefined,
	signer: undefined,
	connectTo: async () => undefined,
	clear: () => {
		localStorage.removeItem('walletType');
	},
	sendTransaction: async () => undefined,
	sendPopulatedTransaction: async () => undefined,
	sendMetaTransaction: async () => undefined,
	canSendMetaTransaction: () => false,
	onMagicLinkAuthorised: () => {}
};

const WalletContext = createContext<WalletContextType>(WALLET_CONTEXT_DEFAULT_VALUE);

export const useWallet = () => {
	const walletContext = useContext(WalletContext);

	if (!walletContext) throw new Error('`useWallet` can not be used outside `WalletContext`');

	return walletContext;
};

type Props = {
	children?: React.ReactNode;
	isMetaTransactionEnabled: boolean;
};

export const WalletProvider: React.FC<Props> = ({ children, isMetaTransactionEnabled }) => {
	const { t } = useTranslation();
	const { push } = useRouter();
	const authorized = useIsAuthorized();

	const [walletApiData, setWalletApiData] = useState<WalletApiState>(WALLET_CONTEXT_DEFAULT_VALUE);

	const {
		currentAccount,
		chainId,
		web3Provider,
		signer,
		connectTo,
		clear,
		sendTransaction,
		sendPopulatedTransaction,
		sendMetaTransaction,
		onMagicLinkAuthorised
	} = walletApiData;

	const { mutate: onWalletAccountChange } = useMetamaskAccountChange(web3Provider);
	const { data } = useCurrentUserQuery();
	const { currentUser } = data || {};

	const { mutate: logout } = useLogout();

	const getWalletType = useCallback(() => {
		return localStorage.getItem('walletType') as WalletType | undefined;
	}, []);

	const canSendMetaTransaction = useCallback(() => {
		const type = getWalletType();
		const isMagicLink = type === 'magiclink';

		return isMagicLink && isMetaTransactionEnabled;
	}, [getWalletType, isMetaTransactionEnabled]);

	useEffect(() => {
		/*
		WalletApi singleton will call setWalletApiData() every time it's inner state changes.
		This will allow this component to react on web3 wallet changes and rerender when needed.
		 */
		void WalletApi.getInstance(setWalletApiData);
	}, []);

	// Checks whether the user is logged in and the account is the same as the one in the database:
	useEffect(() => {
		const walletType = getWalletType();

		if (walletType !== 'metamask') return;

		if (!window.ethereum || !currentUser?.walletAddress) return;
		const addressInSession = currentUser.walletAddress;
		const isTheSameAccount = currentAccount?.toLowerCase() === addressInSession.toLowerCase();

		if (currentAccount && !isTheSameAccount && web3Provider) {
			onWalletAccountChange(currentAccount, {
				onError: () => {
					logout({});
				}
			});
		}
	}, [
		authorized,
		clear,
		currentAccount,
		currentUser?.walletAddress,
		getWalletType,
		logout,
		onWalletAccountChange,
		push,
		web3Provider
	]);

	const sendTransactionSafely = useCallback<WalletContextType['sendTransaction']>(
		async (tx) => {
			try {
				return sendTransaction(tx);
			} catch (e) {
				toast.error(t('errors:transactionFailed'));
			}
		},
		[t, sendTransaction]
	);

	const sendPopulatedTransactionSafely = useCallback<WalletContextType['sendPopulatedTransaction']>(
		async (tx) => {
			try {
				return sendPopulatedTransaction(tx);
			} catch (e) {
				toast.error(t('errors:transactionFailed'));
			}
		},
		[t, sendPopulatedTransaction]
	);

	const sendMetaTransactionSafely = useCallback<WalletContextType['sendMetaTransaction']>(
		async (req) => {
			try {
				return sendMetaTransaction(req);
			} catch (e) {
				toast.error(t('errors:transactionFailed'));
			}
		},
		[t, sendMetaTransaction]
	);

	const contextValue = useMemo(
		() => ({
			connectTo,
			sendTransaction: sendTransactionSafely,
			sendPopulatedTransaction: sendPopulatedTransactionSafely,
			sendMetaTransaction: sendMetaTransactionSafely,
			canSendMetaTransaction,
			onMagicLinkAuthorised,
			clear,
			chainId,
			currentAccount,
			web3Provider,
			signer
		}),
		[
			connectTo,
			sendTransactionSafely,
			sendPopulatedTransactionSafely,
			sendMetaTransactionSafely,
			canSendMetaTransaction,
			onMagicLinkAuthorised,
			clear,
			chainId,
			currentAccount,
			web3Provider,
			signer
		]
	);

	return <WalletContext.Provider value={contextValue}>{children}</WalletContext.Provider>;
};
