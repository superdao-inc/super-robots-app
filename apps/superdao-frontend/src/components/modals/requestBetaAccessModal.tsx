import { useTranslation } from 'next-i18next';

import { Button } from '../button';
import { Body, Title1 } from 'src/components/text';
import { BaseModalProps, Modal, ModalContent, ModalFooter } from 'src/components/baseModal';
import { openExternal } from 'src/utils/urls';

const modalStyles = {
	content: {
		maxWidth: 410,
		minWidth: 'min(400px, 100vw - 24px)',
		minHeight: 195
	}
};

type Props = BaseModalProps & {};

export const RequestBetaAccessModal = (props: Props) => {
	const { isOpen, onClose } = props;

	const { t } = useTranslation();

	const onRequestButtonClick = () => {
		openExternal('https://forms.superdao.co/superdao-beta-new-form');
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} style={modalStyles}>
			<ModalContent>
				<Title1>{t('modals.requestBetaAccess.title')}</Title1>
				<Body className="mt-2">{t('modals.requestBetaAccess.content')}</Body>
			</ModalContent>

			<ModalFooter
				right={
					<>
						<Button size="lg" color="backgroundTertiary" label={t('actions.labels.cancel')} onClick={onClose} />
						<Button
							size="lg"
							color="accentPrimary"
							label={t('modals.requestBetaAccess.requestLabel')}
							onClick={onRequestButtonClick}
						/>
					</>
				}
			/>
		</Modal>
	);
};
