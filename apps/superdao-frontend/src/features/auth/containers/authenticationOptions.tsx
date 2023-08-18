import { useTranslation } from 'next-i18next';

import Link from 'next/link';
import { privacyPolicy, termsOfUse } from 'src/constants';
import { Button, Caption, Label2, MetamaskIcon, ModalTitle, WalletConnect } from 'src/components';
import { WalletType } from 'src/types/wallet';

type AuthorisationOptionsProps = {
	onAuthWithWallet?: (walletType: WalletType) => () => void;

	isLoading?: boolean;
};

const ICON_SIZE = 24;

export const AuthenticationOptions = (props: AuthorisationOptionsProps) => {
	const { onAuthWithWallet, isLoading } = props;

	const { t } = useTranslation();

	return (
		<div className="relative h-full w-full self-center">
			<ModalTitle>{t('pages.login.title')}</ModalTitle>

			<div className="960:mb-0 my-6 flex w-full flex-col gap-4">
				<Button
					className="bg-accentPrimary/15 hover:bg-accentPrimary/20 active:bg-accentPrimary/10 flex cursor-pointer justify-start rounded-lg py-4 px-6"
					color="transparent"
					size="xl"
					onClick={onAuthWithWallet?.('metamask')}
					disabled={isLoading}
					label={
						<div className="flex items-center gap-3">
							<MetamaskIcon width={ICON_SIZE} height={ICON_SIZE} />

							<Label2 className="text-base font-bold">{t('pages.login.wallets.metamask')}</Label2>
						</div>
					}
					data-testid={'WalletItem__metamask'}
				/>

				<Button
					className="bg-accentMuted/15 hover:bg-accentMuted/20 active:bg-accentMuted/10 flex cursor-pointer justify-start rounded-lg py-4 px-6"
					color="transparent"
					size="xl"
					onClick={onAuthWithWallet?.('walletconnect')}
					disabled={isLoading}
					label={
						<div className="flex items-center gap-3">
							<WalletConnect width={ICON_SIZE} height={ICON_SIZE} />

							<Label2 className="text-base font-bold">{t('pages.login.wallets.walletConnect')}</Label2>
						</div>
					}
					data-testid={'WalletItem__walletConnect'}
				/>
			</div>
			<Caption className="960:fixed 960:justify-center -bottom-10 left-0 flex w-full justify-start gap-6">
				<Link href={privacyPolicy}>
					<a
						target="_blank"
						className="text-foregroundPrimary/60 text-base transition-all duration-300 hover:text-white"
					>
						Privacy
					</a>
				</Link>
				<Link href={termsOfUse}>
					<a
						target="_blank"
						className="text-foregroundPrimary/60 text-base transition-all duration-300 hover:text-white"
					>
						Terms
					</a>
				</Link>
			</Caption>
		</div>
	);
};
