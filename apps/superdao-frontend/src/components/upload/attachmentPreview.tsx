import { useState } from 'react';
import styled from '@emotion/styled';

import { getOptimizedFileUrl } from 'src/utils/upload';
import { CrossIcon } from 'src/components/assets/icons/cross';
import { colors, borders } from 'src/style';

type Props = {
	file: string;
	onDelete: () => void;
};

export const AttachmentPreview = ({ file, onDelete }: Props) => {
	const [isLoading, setIsLoading] = useState(true);

	const handleLoad = () => {
		setIsLoading(false);
	};

	return (
		<Wrapper isLoading={isLoading} data-testid={'AttachmentPreview__wrapper'}>
			<Preview src={getOptimizedFileUrl(file)} onLoad={handleLoad} data-testid={'AttachmentPreview__previewImage'} />
			<DeleteButton onClick={onDelete} data-testid={'AttachmentPreview__deleteButton'}>
				<CrossIcon fill={colors.foregroundPrimary} />
			</DeleteButton>
		</Wrapper>
	);
};

const Wrapper = styled.div<{ isLoading: boolean }>`
	position: relative;
	display: inline-block;
	visibility: ${(props) => (props.isLoading ? 'hidden' : 'visible')};
`;

const Preview = styled.img`
	object-fit: contain;
	max-width: 512px;
	width: 100%;
	min-width: 100px;
	max-height: 200px;
	border-radius: ${borders.medium};
`;

const DeleteButton = styled.div`
	cursor: pointer;
	position: absolute;
	top: 13px;
	right: 13px;

	width: 24px;
	height: 24px;
	border-radius: 50%;

	display: flex;
	align-items: center;
	justify-content: center;

	background: rgba(37, 43, 54, 0.7);
	backdrop-filter: blur(4px);
`;
