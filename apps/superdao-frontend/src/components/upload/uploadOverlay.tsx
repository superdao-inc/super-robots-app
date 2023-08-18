import { UploadIcon } from '../assets/icons';

// requires parent with `relative` and `group` classNames
export const UploadOverlay = () => {
	return (
		<div
			className="bg-overlayModal absolute inset-0 flex items-center justify-center transition-opacity group-hover:opacity-100 lg:opacity-0"
			data-testid={'UploadOverlay__block'}
		>
			<UploadIcon fill="white" width={20} height={20} />
		</div>
	);
};
