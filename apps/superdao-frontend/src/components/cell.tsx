import { HTMLAttributes, PropsWithChildren, ReactNode, forwardRef, ForwardedRef } from 'react';
import styled from '@emotion/styled';

import { Label1, SubHeading } from './text';
import { Loader } from './common/loader';
import { colors } from 'src/style';

export type Option = {
	label?: string | ReactNode;
	description?: string | ReactNode;
	disabled?: boolean;
};

export type CellSize = 'xs' | 'sm' | 'md' | 'auto';

type SidesPadding = {
	left?: number;
	right?: number;
};

export type CellProps = HTMLAttributes<HTMLDivElement> &
	PropsWithChildren<Option> & {
		size: CellSize;
		before?: ReactNode;
		after?: ReactNode;
		isLoading?: boolean;
		sidesPadding?: SidesPadding;
		withoutDisabledStyles?: boolean;
	};

export const Cell = forwardRef((props: CellProps, innerRef: ForwardedRef<HTMLDivElement>) => {
	const {
		label,
		sidesPadding,
		size,
		description,
		before,
		after,
		isLoading,
		disabled,
		withoutDisabledStyles,
		color,
		...rest
	} = props;

	if (isLoading) {
		return (
			<Wrapper disabled {...rest}>
				<CellElement size={size} isLoading={isLoading} withoutDisabledStyles={withoutDisabledStyles}>
					<Loader size="md" />
				</CellElement>
			</Wrapper>
		);
	}

	return (
		<Wrapper ref={innerRef} disabled={disabled} {...rest}>
			<CellElement size={size} disabled={disabled} isLoading={isLoading} withoutDisabledStyles={withoutDisabledStyles}>
				{before && <Before left={sidesPadding?.left}>{before}</Before>}

				<Content size={size}>
					{typeof label === 'string' ? <Label color={color}>{label}</Label> : label}
					{typeof description === 'string' ? <Description>{description}</Description> : description}
				</Content>

				{after && <After right={sidesPadding?.right}>{after}</After>}
			</CellElement>
		</Wrapper>
	);
});
Cell.displayName = 'Cell';

export const cellHeight: Record<CellSize, string> = {
	xs: '40',
	sm: '48',
	md: '58',
	auto: 'auto'
};

const CellElement = styled.div<Pick<CellProps, 'size' | 'disabled' | 'isLoading' | 'withoutDisabledStyles'>>`
	display: flex;
	align-items: center;
	justify-content: ${({ isLoading }) => (isLoading ? 'center' : 'space-between')};
	position: relative;
	height: ${({ size }) => (size === 'auto' ? size : cellHeight[size] + 'px')};
	opacity: ${({ disabled, withoutDisabledStyles }) => {
		const disabledOpacity = withoutDisabledStyles ? 0.3 : 0.1;
		return disabled ? disabledOpacity : 1;
	}};
`;

const Wrapper = styled.div<Pick<CellProps, 'disabled'>>`
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'initial')};
`;

const Before = styled.div<Pick<SidesPadding, 'left'>>`
	padding-left: ${({ left }) => (left !== undefined ? `${left}px` : '16px')};
`;

const After = styled.div<Pick<SidesPadding, 'right'>>`
	justify-self: end;
	padding-right: ${({ right }) => (right !== undefined ? `${right}px` : '16px')};
`;

const Content = styled.div<Pick<CellProps, 'size'>>`
	display: flex;
	justify-content: flex-start;
	flex-direction: ${({ size }) => (size === 'md' || size === 'auto' ? 'column' : 'row')};
	color: ${colors.foregroundPrimary};
	width: 100%;

	padding: ${({ size }) => (size === 'auto' ? '8px 16px' : '0 16px')};
	overflow: hidden;
`;

const Label = styled(Label1)`
	padding-right: 12px;
	line-height: 22px;
`;

const Description = styled(SubHeading)`
	color: ${colors.foregroundSecondary};
	line-height: 22px;
`;
