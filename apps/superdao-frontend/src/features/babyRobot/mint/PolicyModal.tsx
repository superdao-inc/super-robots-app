import { Trans, useTranslation } from 'next-i18next';
import { privacyPolicy } from 'src/constants';
import { Body, Title1 } from 'src/components';
import { BaseModalProps, Modal } from 'src/components/baseModal';
import { openExternal } from 'src/utils/urls';

const modalStyles = {
	content: {
		minWidth: '396px',
		width: '396px',
		minHeight: '176px',
		height: '176px',
		borderRadius: '12px'
	}
};

export const PolicyModal: React.FC<BaseModalProps> = (props) => {
	const { isOpen, onClose } = props;

	const { t } = useTranslation();

	const handleRedirectToPolicy = () => {
		openExternal(privacyPolicy);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} style={modalStyles} withCloseIcon>
			<div className="px-6 py-5">
				<Title1>{t('features.babyRobots.mint.privacy.title')}</Title1>
				<Body className="mt-5">{t('features.babyRobots.mint.privacy.content')}</Body>
				<Body className="mt-2">
					<Trans i18nKey="features.babyRobots.mint.privacy.addon">
						For more information, see our full
						<span className="text-accentPrimary cursor-pointer" onClick={handleRedirectToPolicy}>
							Privacy policy
						</span>
					</Trans>
				</Body>
			</div>
		</Modal>
	);
};
