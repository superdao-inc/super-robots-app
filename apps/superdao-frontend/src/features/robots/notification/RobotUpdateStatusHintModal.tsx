import { NewLabel1 } from 'src/components/text';
import { BaseModalProps, Modal } from 'src/components/baseModal';
import { LinkingIcon, OpenseaFilledIcon } from 'src/components';
import { openExternal } from 'src/utils/urls';

const modalStyles = {
	content: {
		maxWidth: 520
	}
};

type Props = BaseModalProps & {
	tokenId: string;
};

export const RobotUpdateStatusHintModal = (props: Props) => {
	const { isOpen, onClose, tokenId } = props;

	const handleOpenTokenPage = () => {
		openExternal(`https://opensea.io/assets/matic/0xdcfa55e5581b1e3f04ac752c08692eacaa509d9e/${tokenId}`);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} withCloseIcon style={modalStyles} className="960:min-w-[520px]">
			<div className="960:py-[56px] 960:px-10 py-4 px-5">
				<NewLabel1 className="font-bold">Update your Robot manually</NewLabel1>
				<NewLabel1 className="mt-4 font-normal text-white/[.7]">
					It usually takes OpenSea a little while to get the metadata. If you see blurry artwork, just click the{' '}
					<span className="text-white">&quot;Refresh metadata&quot;</span> button and you are all set.
				</NewLabel1>
				<div
					className="mt-8 flex cursor-pointer items-center gap-2 transition-all hover:opacity-80"
					onClick={handleOpenTokenPage}
				>
					<OpenseaFilledIcon />
					<NewLabel1 className="font-normal">View Robot on OpenSea</NewLabel1>
					<LinkingIcon />
				</div>
				<img className="mt-10" src="/assets/updateMetadataOnOpenseaHint.png" alt="How to update metadata on OpenSea" />
			</div>
		</Modal>
	);
};
