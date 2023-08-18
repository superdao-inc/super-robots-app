import { useTranslation } from 'next-i18next';
import { useMutation, useQueryClient } from 'react-query';

import { Web3Provider } from '@ethersproject/providers';
import { setUser } from '@sentry/nextjs';
import { useAuthNonceMutation, useAuthSignatureMutation } from 'src/gql/auth.generated';

import { AppError } from 'src/services/errors';
import { toast } from 'src/components/toast/toast';
import { loginMessageKey } from 'src/utils/toastKeys';
import { UserWalletType } from 'src/types/types.generated';
import { UserSession } from 'src/services/UserSession';
import { useAnalytics } from 'src/providers/analyticsProvider';
import { AnalyticsTrackEventType } from 'src/services/analytics/types';

export const useMetamaskAccountChange = (provider?: Web3Provider) => {
	const { t } = useTranslation();
	const analytics = useAnalytics();

	const queryClient = useQueryClient();

	return useMutation(
		async (walletAddress: string) => {
			const { ethereum } = window;
			if (!ethereum) {
				throw new Error(t('pages.login.noMetamask'));
			}

			if (!provider) throw new Error('Can not get provider');

			const signer = provider.getSigner();

			// get nonce from backend
			const nonceData = { walletAddress };
			const { authNonce } = (await useAuthNonceMutation.fetcher({ nonceData })()) || {};

			if (!authNonce) throw new Error('nonce failed');

			toast.loading(t('pages.login.signingToast'), {
				position: 'bottom-center',
				id: loginMessageKey
			});

			// FIXME: IOS wallets break for some reason if you ask them to sign something right after connecting.
			// Experimentally found out that it is enough to wait 3 seconds and the modal with the signature appears regularly.
			await new Promise((resolve) => {
				setTimeout(resolve, 1000);
			});

			// validate nonce and sign
			const signature = await signer.signMessage(authNonce);
			const signatureData = { walletAddress, nonce: authNonce, signature, walletType: UserWalletType.Metamask };

			const result = await useAuthSignatureMutation.fetcher({ signatureData })();
			return result?.authSignature;
		},
		{
			onSuccess: async (result) => {
				const walletAddress = result?.walletAddress || '';

				toast.dismiss(loginMessageKey);
				toast.success(`Account changed to ${walletAddress}`, { position: 'bottom-center', duration: 3000 });

				setUser({ id: result?.id, walletAddress });
				UserSession.setUserWallet(walletAddress);
				analytics.trackCustomAnalyticsEvent(AnalyticsTrackEventType.WALLET_CONNECT);

				await queryClient.resetQueries();

				//TODO: remove after user-choice is public feature
				location.reload();
			},
			onError: async (error: any) => {
				const message = error?.message;

				AppError.capture(error, {
					payload: { tags: { team: 'CORE', section: 'Auth' } },
					display: () => {
						toast.error(message, { id: loginMessageKey, duration: 3000 });
					},
					options: {
						silent: typeof message !== 'string' || message === 'User closed modal'
					}
				});
			}
		}
	);
};
