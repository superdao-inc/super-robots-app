import { useTranslation } from 'next-i18next';
import { ModalText, ModalTitle } from 'src/components';
import { BaseModalProps, Modal, ModalContent } from 'src/components/baseModal';

export const UserAlreadyMintedModal: React.FC<BaseModalProps> = (props) => {
	const { isOpen, onClose } = props;

	const { t } = useTranslation();

	return (
		<Modal isOpen={isOpen} onClose={onClose} withCloseIcon>
			<ModalContent withFooter={false} className="h-[180px] min-h-[180px] sm:h-[212px] sm:min-h-[212px]">
				<ModalTitle>{t('modals.userAlreadyMintedRobot.title')}</ModalTitle>
				<ModalText>
					<>
						You already claimed your Super Robot.
						<br />
						Please check your wallet
					</>
				</ModalText>
			</ModalContent>
		</Modal>
	);
};
