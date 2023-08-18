import { NewLabel1 } from 'src/components/text';
import { BaseModalProps, Modal } from 'src/components/baseModal';

type Props = BaseModalProps & { onExit: () => void };

export const SelectableItemsExitModal = (props: Props) => {
	const { isOpen, onClose, onExit: handleExit } = props;

	return (
		<Modal isOpen={isOpen} withCloseIcon onClose={onClose} className="744:w-[520px] p-10">
			<NewLabel1 className="mt-4 font-bold">Your changes will not be saved if you exit customization mode</NewLabel1>
			<NewLabel1 className="mt-4 font-normal opacity-70">
				Click the “Publish” button to publish your robot changes
			</NewLabel1>

			<div
				className="mt-8 flex w-max shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#EA526F] py-2 px-4 transition-all duration-100 hover:opacity-90 active:opacity-80"
				onClick={handleExit}
			>
				<NewLabel1 className="font-bold">Exit anyway</NewLabel1>
			</div>
		</Modal>
	);
};
