import { DragEvent, forwardRef } from 'react';
import styled from '@emotion/styled';

import { useTranslation } from 'next-i18next';
import { Input, InputProps } from 'src/components/input';
import { colors } from 'src/style';

export type InputFileProps = InputProps & { filename?: string };

export const InputFile = forwardRef<HTMLInputElement, InputFileProps>((props, ref) => {
	const { t } = useTranslation();

	const handleDrop = (event: DragEvent<HTMLInputElement>) => {
		event.preventDefault();
		props?.onDrop?.(event);
	};

	return (
		<StyledInputFileWrapper>
			<StyledInputFile type="file" id="files" ref={ref} {...props} onDrop={handleDrop} />
			<StyledFileInputLabel htmlFor="files" hasFilename={!!props.filename}>
				{props.filename || t('pages.importMembers.modal.placeholder')}
			</StyledFileInputLabel>
		</StyledInputFileWrapper>
	);
});

const StyledInputFileWrapper = styled.div`
	position: relative;
`;

const StyledInputFile = styled(Input)`
	display: none;

	&::file-selector-button {
		display: none;
		color: transparent;
	}

	&:hover {
		cursor: pointer;
	}
`;

const StyledFileInputLabel = styled.label<{ hasFilename: boolean }>`
	position: absolute;
	overflow: hidden;
	top: 50%;
	left: 16px;
	width: calc(100% - 32px);
	transform: translateY(-50%);
	white-space: nowrap;
	text-overflow: ellipsis;
	color: ${({ hasFilename }) => (hasFilename ? colors.foregroundPrimary : colors.foregroundTertiary)};
`;
