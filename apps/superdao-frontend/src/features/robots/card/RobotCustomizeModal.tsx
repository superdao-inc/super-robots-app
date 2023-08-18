import cn from 'classnames';

import { NewLabel1 } from 'src/components/text';
import { BaseModalProps, Modal } from 'src/components/baseModal';

type Props = BaseModalProps & { className?: string };

export const RobotCustomizeModal = (props: Props) => {
	const { isOpen, onClose, className } = props;

	return (
		<Modal isOpen={isOpen} withCloseIcon onClose={onClose} className={cn('960:w-[520px] p-10', className)}>
			<NewLabel1 className="mt-4 font-bold">
				Customization is currently available to a limited number of users
			</NewLabel1>
			<NewLabel1 className="mt-4">As soon as we open access for everyone, we will notify you!</NewLabel1>

			<img src="/customize-robot.png" className="mt-10" />
		</Modal>
	);
};
