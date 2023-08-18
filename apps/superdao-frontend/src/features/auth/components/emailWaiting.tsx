import { useTranslation, Trans } from 'next-i18next';
import { AuthenticationWaiting } from './authenticationWaiting';

type Props = {
	email: string;
};

export const EmailWaiting = (props: Props) => {
	const { email } = props;

	const { t } = useTranslation();

	return (
		<AuthenticationWaiting
			title={t('pages.login.emailWaiting.title')}
			description={
				<Trans i18nKey="pages.login.emailWaiting.description" values={{ email }}>
					Use the code we sent to <strong>{email}</strong>
					<br /> to sign in. <strong>Don’t close this page!</strong>
				</Trans>
			}
		/>
	);
};
