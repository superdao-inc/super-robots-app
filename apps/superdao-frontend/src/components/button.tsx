import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Loader } from './common/loader';
import { borders, colors } from 'src/style';
import { Label1, Label2 } from 'src/components/text';
import { Extends } from 'src/utils/types';

type Size = 'md' | 'lg' | 'xl' | 'xxl';
type ButtonColor =
	| 'accentPrimary'
	| 'accentNegative'
	| 'backgroundTertiary'
	| 'backgroundSecondary'
	| 'backgroundQuaternary'
	| 'overlaySecondary'
	| 'overlayOrange'
	| 'overlayTertiary'
	| 'tintBlue'
	| 'twitter'
	| 'polygonScan'
	| 'foregroundTertiary'
	| 'iconBackground';

type Color = Extends<keyof typeof colors, ButtonColor> | 'transparent';

type ButtonLabelProps = {
	color: Color;
	size: Size;
	label?: React.ReactNode;
	isLoading?: boolean;
	disabled?: boolean;
	labelClassName?: string;
};

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> &
	ButtonLabelProps & {
		leftIcon?: React.ReactElement;
		rightIcon?: React.ReactElement;
		isRound?: boolean;
	};

const buttonSizes: Record<Size, string> = {
	md: `
		min-width: 32px;
		min-height: 32px;
	`,
	lg: `
		min-width: 40px;
		min-height: 40px;
	`,
	xl: `
		min-width: 48px;
		min-height: 48px;
	`,
	xxl: `
		min-width: 56px;
		min-height: 56px;
	`
};

const ButtonLabel: React.FC<ButtonLabelProps> = ({ label, size, color, isLoading, disabled, labelClassName }) => {
	const LabelElement = size === 'lg' || size === 'xl' ? Label1 : Label2;

	const loaderColor = color.includes('accentPrimary') || color.includes('accentNegative') ? 'light' : 'dark';
	const isDisabledLabel = !!disabled && !isLoading;

	return (
		<div className="relative">
			{label && (
				<Label className={labelClassName} as={LabelElement} isVisible={!isLoading} isDisabled={isDisabledLabel}>
					{label}
				</Label>
			)}
			{isLoading && (
				<div style={{ transform: 'translate(-50%, -50%)' }} className="absolute left-1/2 top-1/2">
					<Loader size={size} color={loaderColor} />
				</div>
			)}
		</div>
	);
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const {
		size,
		color,
		label,
		leftIcon,
		rightIcon,
		isLoading,
		disabled = false,
		children,
		labelClassName,
		...rest
	} = props;

	return (
		<ButtonElement size={size} color={color} disabled={disabled} ref={ref} {...rest}>
			{leftIcon && (
				<Icon position="left" size={size} disabled={disabled}>
					{leftIcon}
				</Icon>
			)}
			{children}
			{label && (
				<ButtonLabel
					labelClassName={labelClassName}
					label={label}
					size={size}
					color={color}
					isLoading={isLoading}
					disabled={disabled}
				/>
			)}
			{rightIcon && (
				<Icon position="right" size={size} disabled={disabled}>
					{rightIcon}
				</Icon>
			)}
		</ButtonElement>
	);
});

Button.displayName = 'Button';

type IconButtonProps = Omit<ButtonProps, 'label' | 'leftIcon' | 'rightIcon'> & {
	icon: React.ReactElement;
	isSymmetric?: boolean;
};

export const IconButton: React.FC<IconButtonProps> = (props) => {
	const { icon, ...rest } = props;

	return <IconButtonElement {...rest}>{icon}</IconButtonElement>;
};

const Label = styled.div<{ isVisible: boolean; isDisabled: boolean }>`
	${({ isVisible }) => `opacity: ${isVisible ? 1 : 0};`}
	${({ isDisabled }) => isDisabled && `opacity: 0.6;`}
`;

const ButtonElement = styled.button<{ color: Color; size: Size; isSymmetric?: boolean; isRound?: boolean }>`
	border: none;
	outline: none;
	cursor: pointer;

	display: flex;
	align-items: center;
	justify-content: space-around;
	gap: 16px;

	border-radius: ${borders.medium};
	padding: ${(props) => {
		switch (props.size) {
			case 'xxl':
				return '16px 24px';
			case 'xl':
				return '12px 20px';
			case 'lg':
				return '8px 24px';
			default:
				return '6px 16px';
		}
	}};
	transition: background-color 150ms ease-in-out;

	${(props) => {
		const { color } = props;

		if (color === 'transparent') {
			return css`
				background-color: transparent;
			`;
		}

		return css`
			background-color: ${colors[color]};
			&:hover {
				background-color: ${colors[`${color}Hover`]};
			}
			&:active:not(&:disabled) {
				background-color: ${colors[`${color}Active`]};
			}
		`;
	}}

	${(props) => {
		const { isRound } = props;

		if (isRound) {
			return css`
				border-radius: 50%;
			`;
		}
	}}

	&:disabled {
		cursor: not-allowed;
	}
`;

const IconButtonElement = styled(ButtonElement)`
	${(props) => props.isSymmetric && buttonSizes[props.size]};
	padding: ${(props) => (props.size === 'lg' ? '8px 8px' : '6px 6px')};
`;

const Icon = styled.div<{ size: Size; position: string; disabled?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;

	${(props) => (props.disabled ? 'opacity: 0.6;' : undefined)}

	margin: ${(props) =>
		(props.size === 'lg' || props.size === 'md') && (props.position === 'right' ? '2px 0 2px -8px' : '2px -8px 2px 0')};
`;
