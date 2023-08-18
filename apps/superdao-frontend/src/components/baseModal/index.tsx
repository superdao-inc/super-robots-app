import { ReactNode } from 'react';
import ReactModal from 'react-modal';
import cn from 'classnames';

import { CrossBoldIcon } from 'src/components/assets/icons/crossBold';

type Props = ReactModal.Props & {
	isOpen: boolean;
	children: ReactNode;
	onClose?: () => void;
	withCloseIcon?: boolean;
	className?: string;
};

export const modalCloseTimeoutMS = 200;

const Modal = (props: Props) => {
	const { onClose, withCloseIcon, className, children } = props;

	const iconWrapperClass =
		'hover:bg-iconBackground active:bg-iconBackgroundActive absolute top-4 right-4 z-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-[50%] transition-all duration-100';

	return (
		<ReactModal
			{...props}
			onRequestClose={onClose}
			ariaHideApp={false}
			closeTimeoutMS={modalCloseTimeoutMS}
			className={cn('Modal', className)}
			overlayClassName="ModalOverlay"
		>
			{children}
			{onClose && withCloseIcon && (
				<div className={iconWrapperClass} onClick={onClose} data-testid="Modal__closeButton">
					<CrossBoldIcon width={24} height={24} />
				</div>
			)}
		</ReactModal>
	);
};

export { Modal };
export * from './types';
export * from './content';
export * from './footer';
