import { useTranslation } from 'next-i18next';
import { Modal } from 'src/components/baseModal';
import { AuthenticationWaiting } from 'src/features/auth/components/authenticationWaiting';

type Props = {
	provider: string;
};

export const ModalSocialWaiting = (props: Props) => {
	let { provider } = props;
	const { t } = useTranslation();

	provider = provider.charAt(0).toUpperCase() + provider.slice(1);

	return (
		<Modal isOpen style={{ content: { background: 'transparent', boxShadow: 'none' } }}>
			<AuthenticationWaiting
				title={t('pages.login.socialWaiting.title', { provider })}
				description={t('pages.login.socialWaiting.description')}
			/>
		</Modal>
	);
};
