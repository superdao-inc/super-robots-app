import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { utils } from 'ethers';

import { setUser } from '@sentry/nextjs';
import { createGnosisContract } from '@sd/superdao-shared';

import { useAuthNonceMutation, useAuthSignatureMutation, useAuthSmartWalletMutation } from 'src/gql/auth.generated';
import { useWallet } from 'src/providers/walletProvider';

import { toast } from 'src/components/toast/toast';

import { WalletType } from 'src/types/wallet';

//  Error handling
import { loginMessageKey } from 'src/utils/toastKeys';
import { parseGqlErrorMessage } from 'src/utils/errors';
import { handleAuthError } from './common';
import { UserWalletType } from 'src/types/types.generated';
import { MetamaskError } from 'src/types/metamask';
import { UserSession } from 'src/services/UserSession';
import { useAnalytics } from 'src/providers/analyticsProvider';
import { AnalyticsTrackEventType } from 'src/services/analytics/types';

// https://github.com/MetaMask/metamask-mobile/issues/3855#issuecomment-1110690572
const openMetaMaskUrl = (url: string) => {
	const a = document.createElement('a');
	a.href = url;
	a.target = '_self';
	a.rel = 'noreferrer noopener';
	document.body.appendChild(a);
	a.click();
	a.remove();
};

export const useAuthWithWallet = () => {
	const { t } = useTranslation();
	const { asPath } = useRouter();
	const queryClient = useQueryClient();
	const { connectTo, clear } = useWallet();
	const analytics = useAnalytics();

	useEffect(() => {
		const listener = () => {
			// NOTE: WC redirects to the wallet page and closes site if we don't do this
			// https://github.com/WalletConnect/walletconnect-monorepo/issues/576#issuecomment-966038731
			if (document.visibilityState === 'hidden') localStorage.removeItem('WALLETCONNECT_DEEPLINK_CHOICE');
		};

		document.addEventListener('visibilitychange', listener);

		return () => document.removeEventListener('visibilitychange', listener);
	}, []);

	return useMutation(
		async (walletType: WalletType) => {
			const { ethereum } = window;
			if (walletType === 'metamask' && !ethereum) {
				openMetaMaskUrl(`https://metamask.app.link/dapp/${window.location.hostname}${asPath}`);
				throw new Error(t('pages.login.noMetamask'));
			}

			const provider = await connectTo(walletType);
			if (!provider) throw new Error('Can not get provider');

			const signer = provider.getSigner();
			const walletAddress = await signer.getAddress();

			// get nonce from backend
			const nonceData = { walletAddress };
			const { authNonce } = (await useAuthNonceMutation.fetcher({ nonceData })()) || {};

			if (!authNonce) throw new Error('nonce failed');

			toast.loading(t('pages.login.signingToast'), {
				position: 'bottom-center',
				id: loginMessageKey
			});

			const bytecode = await provider.getCode(walletAddress);
			const isSmartContract = bytecode && utils.hexStripZeros(bytecode) !== '0x';

			// FIXME: IOS wallets break for some reason if you ask them to sign something right after connecting.
			// Experimentally found out that it is enough to wait 3 seconds and the modal with the signature appears regularly.
			await new Promise((resolve) => {
				setTimeout(resolve, 3000);
			});

			// validate nonce and sign
			let signature: string;
			try {
				signature = await signer.signMessage(authNonce);
			} catch (e) {
				const metamaskErrorMessage = t(`errors.metamask.${(e as MetamaskError).code}`, '');

				throw new Error(metamaskErrorMessage || t('pages.login.error'));
			}
			const signatureData = { walletAddress, nonce: authNonce, signature };

			if (!isSmartContract) {
				const userWalletType = walletType === 'metamask' ? UserWalletType.Metamask : UserWalletType.WalletConnect;
				const data = await useAuthSignatureMutation.fetcher({
					signatureData: { ...signatureData, walletType: userWalletType }
				})();
				return data?.authSignature;
			}

			try {
				const data = await useAuthSmartWalletMutation.fetcher({ smartWalletSignatureData: signatureData })();
				return data?.authSmartWallet;
			} catch (error) {
				// that's ok, probably it's gnosis, keep trying
			}

			const gnosisSafeContract = createGnosisContract(walletAddress, signer);

			const listenToGnosisSafeContract = new Promise<() => void>((resolve) => {
				const unsubscribe = gnosisSafeContract.onSign(async () => {
					const messageHash = utils.hashMessage(authNonce);
					// Upon detecting the SignMsg event, validate that the contract signed the message
					const messageWasSigned = await gnosisSafeContract.validateSignature(messageHash, signature).catch(() => {});

					if (messageWasSigned) {
						resolve(unsubscribe);
					}

					// If the message was not signed, keep listening without throwing an error.
					// It's possible that we detected a SignMsg event from an older tx in the queue, since Gnosis requires all txs in its queue to be processed
					// We will keep listening for the event until we detect that the message was signed
				});
			});

			const unsubscribe = await listenToGnosisSafeContract;
			unsubscribe();

			const data = await useAuthSmartWalletMutation.fetcher({ smartWalletSignatureData: signatureData })();
			return data?.authSmartWallet;
		},

		{
			onSuccess: async (result) => {
				toast.dismiss(loginMessageKey);

				await queryClient.resetQueries();

				const walletAddress = result?.walletAddress || '';

				setUser({ id: result?.id, walletAddress });
				UserSession.setUserWallet(walletAddress);
				analytics.trackCustomAnalyticsEvent(AnalyticsTrackEventType.WALLET_CONNECT);
			},

			onError: async (error: any) => {
				handleAuthError(error, parseGqlErrorMessage(error), t('pages.login.error'));

				await clear();
			}
		}
	);
};
