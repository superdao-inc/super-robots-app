import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { MouseEvent, useState } from 'react';
import { getDownloadFileUrl, getOptimizedFileUrl } from 'src/utils/upload';
import { CrossIcon, DownloadIcon } from './assets/icons';
import { colors } from 'src/style';

type Props = {
	fileId: string;
	onClose?: (e: MouseEvent) => void;
};

export const FullScreenAttachment = ({ fileId, onClose }: Props) => {
	const [downloadHover, setDownloadHover] = useState(false);
	const [closeHover, setCloseHover] = useState(false);

	const bindMouseEnter = (callback: any) => {
		return () => callback(true);
	};

	const bindMouseLeave = (callback: any) => {
		return () => callback(false);
	};

	const handleBlockEvent = (e: MouseEvent) => e.stopPropagation();
	const handleBlockEventAndClose = (e: MouseEvent) => {
		e.stopPropagation();
		onClose?.(e);
	};

	return createPortal(
		<div
			className="bg-overlayHeavy fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center"
			onClick={handleBlockEventAndClose}
		>
			<div className="absolute top-5 right-5 flex gap-6">
				<a href={getDownloadFileUrl(fileId)} onClick={handleBlockEvent}>
					<DownloadIcon
						width={24}
						height={24}
						className={'cursor-pointer transition-all'}
						fill={downloadHover ? colors.foregroundPrimary : colors.foregroundSecondary}
						onMouseEnter={bindMouseEnter(setDownloadHover)}
						onMouseLeave={bindMouseLeave(setDownloadHover)}
					/>
				</a>
				<CrossIcon
					width={24}
					height={24}
					className={'cursor-pointer transition-all'}
					fill={closeHover ? colors.foregroundPrimary : colors.foregroundSecondary}
					onMouseEnter={bindMouseEnter(setCloseHover)}
					onMouseLeave={bindMouseLeave(setCloseHover)}
					onClick={onClose}
				/>
			</div>
			<Image src={getOptimizedFileUrl(fileId)} onClick={handleBlockEvent} />
		</div>,
		document.body
	);
};

const Image = styled.img`
	max-width: 90%;
	max-height: 80%;
	object-fit: contain;
`;
