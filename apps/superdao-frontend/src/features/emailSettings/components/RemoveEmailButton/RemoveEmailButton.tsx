import { useTranslation } from 'next-i18next';
import { memo, MouseEvent, MouseEventHandler, useCallback } from 'react';

import { useSwitch } from 'src/hooks';
import { Button, IconButton, TrashIcon } from 'src/components';
import { Modal, ModalContent, ModalFooter } from 'src/components/baseModal';
import Tooltip from 'src/components/tooltip';

const MODAL_STYLES = { content: { maxWidth: '400px', minWidth: 'min(400px, 100vw - 32px)' } };

type RemoveEmailButtonProps = {
	disabled?: boolean;
	onClick: MouseEventHandler<HTMLButtonElement>;
};

const RemoveEmailButton = ({ disabled = false, onClick }: RemoveEmailButtonProps) => {
	const { t } = useTranslation();
	const [shouldShowModal, modal] = useSwitch(false);

	const handleRemove = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			modal.off();
			onClick(event);
		},
		[modal, onClick]
	);

	const modalButtonsTemplate = (
		<div className="flex gap-4">
			<Button
				onClick={modal.off}
				label={t('pages.emailSettings.removeEmail.confirmation.cancel')}
				size="lg"
				color="transparent"
			/>
			<Button
				onClick={handleRemove}
				label={t('pages.emailSettings.removeEmail.confirmation.action')}
				size="lg"
				color="accentNegative"
			/>
		</div>
	);

	return (
		<>
			<Tooltip
				className="shrink-0"
				content={<span className="text-sm">{t('pages.emailSettings.removeEmail.action')}</span>}
				placement="bottom"
			>
				<IconButton
					type="button"
					color="overlaySecondary"
					size="lg"
					icon={<TrashIcon className="fill-foregroundTertiary" width={16} height={16} />}
					isSymmetric
					disabled={disabled}
					data-testid="RemoveEmailButton__iconButton"
					onClick={modal.on}
				/>
			</Tooltip>
			<Modal isOpen={shouldShowModal} style={MODAL_STYLES}>
				<ModalContent className="text-foregroundPrimary bold text-2xl font-bold" withFooter={false}>
					{t('pages.emailSettings.removeEmail.confirmation.text')}
				</ModalContent>
				<ModalFooter right={modalButtonsTemplate} />
			</Modal>
		</>
	);
};

export default memo(RemoveEmailButton);
