import { BaseModalProps, Modal } from 'src/components/baseModal';
import { NewLabel1, RocketIcon } from 'src/components';

type Props = BaseModalProps & {
	onConfirm?: () => void;
	availableCustomizeActivationsCount: number;
};

export const PublishAttemptModal = (props: Props) => {
	const { isOpen, onClose, onConfirm, availableCustomizeActivationsCount } = props;

	return (
		<Modal
			isOpen={isOpen}
			withCloseIcon
			onClose={onClose}
			className="744:min-w-[520px] 744:p-10 744:pt-[56px] px-5 py-8"
		>
			<NewLabel1 className="744:block hidden font-bold">
				You will spend 1 of the available {availableCustomizeActivationsCount}
				<br />
				publications. Are you sure?
			</NewLabel1>
			<NewLabel1 className="744:hidden pr-8 font-bold">
				You will spend 1 of the
				<br />
				available {availableCustomizeActivationsCount} publications.
				<br />
				Are you sure?
			</NewLabel1>
			<NewLabel1 className="mt-4 font-bold opacity-70">
				Click the “Publish” button to publish your robot changes
			</NewLabel1>
			<div
				onClick={onConfirm}
				className="mt-8 flex w-max cursor-pointer items-center justify-center gap-2 rounded-lg bg-white py-2 px-4 transition-all hover:bg-white/[.9] active:bg-white/[.8]"
			>
				<RocketIcon />
				<NewLabel1 className="font-bold text-black">Publish</NewLabel1>
			</div>
		</Modal>
	);
};
