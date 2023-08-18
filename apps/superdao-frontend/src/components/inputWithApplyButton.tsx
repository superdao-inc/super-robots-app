import React, { InputHTMLAttributes, forwardRef, FC } from 'react';
import styled from '@emotion/styled';

import { Input } from './input';
import { CheckIcon, TrashIcon } from './assets/icons';
import { Button } from './button';
import { Loader } from './common/loader';
import { colors } from 'src/style';
import { getIsValueProvided } from 'src/utils/texts';

type Props = InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	error?: string;
	isLoading?: boolean;
	isApplied?: boolean;
	onApply: () => void;
	onReset: () => void;
};

export const InputWithApplyButton = forwardRef<HTMLInputElement, Props>((props, ref) => {
	const { value, isApplied, onApply, onReset, isLoading, ...restProps } = props;
	const isValueProvided = getIsValueProvided(value);

	let InputButton;
	switch (true) {
		case isLoading: {
			InputButton = (
				<ActionButton>
					<Loader size="sm" />
				</ActionButton>
			);
			break;
		}
		case isApplied: {
			InputButton = <DeleteButton onClick={onReset} />;
			break;
		}
		default: {
			InputButton = <ApplyButton disabled={!isValueProvided} onClick={onApply} />;
		}
	}

	return <Input value={value} {...restProps} ref={ref} rightIcon={InputButton} />;
});

InputWithApplyButton.displayName = 'InputWithApplyButton';

type ActionButtonProps = {
	onClick?: () => void;
	disabled?: boolean;
	children?: React.ReactNode;
};

const ActionButton: FC<ActionButtonProps> = (props) => {
	const { children, ...restProps } = props;

	return (
		<SquareButton {...restProps} color="overlaySecondary" size="md">
			{children}
		</SquareButton>
	);
};

const ApplyButton = (props: ActionButtonProps) => {
	const { disabled, onClick } = props;

	return (
		<ActionButton disabled={disabled} onClick={onClick}>
			<CheckIconStyled color={disabled ? colors.overlayQuarternary : colors.foregroundSecondary} />
		</ActionButton>
	);
};

type DeleteButtonProps = {
	onClick: () => void;
};

const DeleteButton = (props: DeleteButtonProps) => {
	const { onClick } = props;

	return (
		<ActionButton onClick={onClick}>
			<TrashIconStyled width={14} height={14} />
		</ActionButton>
	);
};

const TrashIconStyled = styled(TrashIcon)`
	& > g {
		transform: scale(0.6);
	}
`;

const CheckIconStyled = styled(CheckIcon)`
	& > path {
		fill: ${(props) => props.color};
	}
`;

const SquareButton = styled(Button)`
	width: 28px;
	height: 28px;
	border-radius: 4px;
	padding: 6px;
`;
