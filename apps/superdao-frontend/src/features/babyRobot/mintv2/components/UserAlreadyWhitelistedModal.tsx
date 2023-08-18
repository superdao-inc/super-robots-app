import { useTranslation } from 'next-i18next';
import { ModalText, ModalTitle } from 'src/components';
import { BaseModalProps, Modal, ModalContent } from 'src/components/baseModal';

export const UserAlreadyWaitlistedModal: React.FC<BaseModalProps> = (props) => {
	const { isOpen, onClose } = props;

	const { t } = useTranslation();

	return (
		<Modal isOpen={isOpen} onClose={onClose} withCloseIcon>
			<ModalContent withFooter={false} className="h-[150px] min-h-[150px] sm:h-[182px] sm:min-h-[182px]">
				<ModalTitle>{t('modals.userAlreadyMintedRobot.title')}</ModalTitle>
				<ModalText>
					<>You’re already waitlisted</>
				</ModalText>
			</ModalContent>
		</Modal>
	);
};
