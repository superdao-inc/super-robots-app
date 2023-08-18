import { useTranslation } from 'next-i18next';
import { Body, Button, Title1 } from 'src/components';
import { BaseModalProps, Modal, ModalFooter } from 'src/components/baseModal';

const modalStyles = {
	content: {
		minWidth: '376px',
		width: '376px',
		minHeight: '203px',
		height: '203px'
	}
};

export const UserAlreadyMintedModal: React.FC<BaseModalProps> = (props) => {
	const { isOpen, onClose } = props;

	const { t } = useTranslation();

	return (
		<Modal isOpen={isOpen} onClose={onClose} style={modalStyles}>
			<div className="px-6 py-5">
				<Title1>{t('modals.userAlreadyMintedRobot.title')}</Title1>
				<Body className="mt-2">{t('modals.userAlreadyMintedRobot.text')}</Body>
			</div>
			<ModalFooter
				right={<Button onClick={onClose} label={t('actions.labels.gotIt')} size="lg" color="accentPrimary" />}
			/>
		</Modal>
	);
};
