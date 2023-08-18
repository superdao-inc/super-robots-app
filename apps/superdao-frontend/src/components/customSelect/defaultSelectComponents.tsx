import {
	ClearIndicatorProps,
	DropdownIndicatorProps,
	MultiValueProps,
	OptionProps,
	SingleValueProps
} from 'react-select';
import styled from '@emotion/styled';

import { CheckIcon, ChevronDown, CrossIcon } from '../assets/icons';
import { IconButton } from '../button';
import { Cell, CellSize } from '../cell';
import { CustomComponentType } from './types';
import { colors } from 'src/style';

export function DefaultDropdownIndicator<T>(menuIsOpen: boolean) {
	return (_: DropdownIndicatorProps<T>) => <StyledChevronIcon menuIsOpen={menuIsOpen} />;
}

const StyledChevronIcon = styled(({ menuIsOpen, ...rest }: { menuIsOpen: boolean }) => <ChevronDown {...rest} />)`
	transform: rotate(${({ menuIsOpen }) => menuIsOpen && '180deg'});
`;

export function DefaultCrossIndicator<T>(props: ClearIndicatorProps<T>) {
	const { innerProps } = props;

	return (
		<IconButton
			icon={<StyledCrossIcon width={11} height={11} />}
			{...(innerProps as any)}
			size="md"
			color="transparent"
		/>
	);
}

const StyledCrossIcon = styled(CrossIcon)`
	&:hover {
		cursor: pointer;
	}
`;

export function DefaultOption<T>(cellsSize: CellSize, withoutDisabledStyles: boolean | undefined) {
	return (props: OptionProps<T>) => {
		const { data, isSelected, isDisabled, innerRef, innerProps } = props;

		return (
			<StyledCell
				ref={innerRef as any}
				after={isSelected && <CheckIcon />}
				size={cellsSize}
				disabled={isDisabled}
				withoutDisabledStyles={withoutDisabledStyles}
				{...innerProps}
				{...data}
			/>
		);
	};
}

export function DefaultSingleValue<T>(props: SingleValueProps<T>) {
	const { data, innerProps } = props;

	return (
		<StyledSingleValueContainer {...innerProps}>
			<Text>{(data as { label?: string })?.label}</Text>
		</StyledSingleValueContainer>
	);
}

export function DefaultMultiValue<T>(SelectedPlaceholder?: CustomComponentType) {
	return (props: MultiValueProps<T>) => {
		const { data, innerProps, index, selectProps, options } = props;

		if (Array.isArray(selectProps?.value) && selectProps?.value?.length === options?.length) {
			if (index === 0) {
				return SelectedPlaceholder ? (
					<SelectedPlaceholder {...innerProps} />
				) : (
					<StyledSingleValueContainer {...innerProps}>
						<Text>All selected</Text>
					</StyledSingleValueContainer>
				);
			}

			return null;
		}

		return (
			<StyledSingleValueContainer {...innerProps}>
				<Text>
					{index !== 0 && ', '}
					{(data as { label?: string })?.label}
				</Text>
			</StyledSingleValueContainer>
		);
	};
}

const Text = styled.span`
	font-size: 15px;
	line-height: 24px;
`;

const StyledCell = styled(Cell)<{ withoutDisabledStyles: boolean | undefined }>`
	width: 100%;
	min-height: 40px;

	&:hover {
		background: ${({ withoutDisabledStyles }) => (withoutDisabledStyles ? '' : colors.backgroundTertiaryHover)};
	}
`;

export const StyledSingleValueContainer = styled.div`
	color: ${colors.foregroundPrimary};
	grid-area: 1/1/2/3;
	max-width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	box-sizing: border-box;
	margin: 0;
	min-height: 0;
	display: flex;
	gap: 8px;
`;
