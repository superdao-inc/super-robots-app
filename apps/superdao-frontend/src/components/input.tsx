import { forwardRef, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import styled from '@emotion/styled';
import cn from 'classnames';
import { Loader } from './common/loader';
import { colors, getInputFileWrapperStyleAppendix, getInputWrapperStyle } from 'src/style';
import { Caption, Label1, SubHeading } from 'src/components/text';

type LabelProps = HTMLAttributes<HTMLLabelElement> & {};

export const Label = (props: LabelProps) => {
	return <Label1 as="span" {...props} className="mb-2" />;
};

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	label?: ReactNode;
	description?: ReactNode;
	error?: string;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	renderRight?: ReactNode;
	prefix?: string;
	isLoading?: boolean;
	errorClassName?: string;
	prefixClassName?: string;
	wrapperClassName?: string;
	appearance?: 'hide';
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const {
		label,
		description,
		error,
		leftIcon,
		rightIcon,
		renderRight,
		prefix,
		isLoading,
		errorClassName,
		prefixClassName,
		wrapperClassName,
		appearance,
		readOnly,
		...rest
	} = props;

	const { disabled, type } = rest;

	const Wrapper = readOnly ? ReadOnlyWrapper : LabelWrapper;

	return (
		<Wrapper>
			{label && <Label>{label}</Label>}
			{description && (
				<SubHeading color={colors.foregroundSecondary} className="mb-1">
					{description}
				</SubHeading>
			)}
			<InputWrapper
				isDisabled={disabled}
				type={type}
				className={cn(wrapperClassName, description && 'mt-2')}
				hasError={!!error}
			>
				<div className={`flex w-full items-center gap-4 py-2 pl-4 ${renderRight ? 'pr-3' : 'pr-4'}`}>
					{leftIcon}
					{prefix && <Prefix className={`truncate ${prefixClassName}`}>{prefix}</Prefix>}
					<InputElement
						hasError={!!error}
						spellCheck={false}
						appearance={appearance}
						readOnly={readOnly}
						{...rest}
						ref={ref}
					/>
					{isLoading && <Loader size="sm" />}
					{rightIcon && <RightIcon>{rightIcon}</RightIcon>}
				</div>
				{renderRight}
			</InputWrapper>
			{error && <Error className={errorClassName}>{error}</Error>}
		</Wrapper>
	);
});

Input.displayName = 'Input';

const LabelWrapper = styled.label`
	width: 100%;
	position: relative;
	display: inline-block;
`;

const ReadOnlyWrapper = styled.div`
	width: 100%;
	position: relative;
`;

const InputWrapper = styled.div<{ isDisabled?: boolean; type?: string; hasError: boolean }>`
	position: relative;

	${({ isDisabled }) => getInputWrapperStyle({ disabled: isDisabled, padding: 0, gap: 0 })}
	${({ type }) => type === 'file' && getInputFileWrapperStyleAppendix()}
	${({ hasError }) => hasError && { border: `1px solid ${colors.accentNegative}` }}

	&[type='number'], &[type='date'], &[type='datetime-local'] {
		border: none;
	}
`;

const InputElement = styled.input<{ hasError?: boolean } & Pick<InputProps, 'appearance'>>`
	border: 0;
	outline: none;
	padding: 0;

	font-size: 17px;
	line-height: inherit;

	background: transparent;
	color: ${({ hasError }) => (hasError ? colors.accentNegative : colors.foregroundPrimary)};
	caret-color: ${colors.foregroundPrimary};

	flex: 1;

	&::placeholder,
	&:disabled {
		color: ${(props) => (props.hasError ? colors.errorDefault : 'rgba(255, 255, 255, 0.7)')};
	}

	&:-webkit-autofill,
	&:-webkit-autofill:focus {
		-webkit-box-shadow: inset 0 0 0 1000px ${colors.darkGrey};
		-webkit-text-fill-color: ${({ hasError }) => (hasError ? colors.accentNegative : colors.foregroundPrimary)};
		caret-color: ${colors.foregroundPrimary};
	}

	&[type='text']:focus,
	&[type='email']:focus,
	&[type='url']:focus,
	&[type='password']:focus,
	&[type='number']:focus,
	&[type='date']:focus,
	&[type='datetime-local']:focus,
	&[type='month']:focus,
	&[type='search']:focus,
	&[type='tel']:focus,
	&[type='time']:focus,
	&[type='week']:focus,
	&[multiple]:focus {
		box-shadow: none;
	}
	&[type='date'] {
		overflow: visible;
	}
	&::-webkit-calendar-picker-indicator {
		color: rgba(0, 0, 0, 0);
		opacity: 1;
		display: block;
		background-image: url("data:image/svg+xml,%3Csvg width='14' height='15' viewBox='0 0 14 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.66 0.25C5.07421 0.25 5.41 0.585786 5.41 1V1.25H8.59V1C8.59 0.585786 8.92579 0.25 9.34 0.25C9.75421 0.25 10.09 0.585786 10.09 1V1.25013C10.5108 1.25081 10.8711 1.25494 11.1747 1.27974C11.5546 1.31078 11.9112 1.37789 12.2485 1.54973C12.7659 1.81338 13.1866 2.23408 13.4503 2.75153C13.6221 3.08879 13.6892 3.44545 13.7203 3.82533C13.75 4.18956 13.75 4.6354 13.75 5.16955V10.8305C13.75 11.3646 13.75 11.8104 13.7203 12.1747C13.6892 12.5546 13.6221 12.9112 13.4503 13.2485C13.1866 13.7659 12.7659 14.1866 12.2485 14.4503C11.9112 14.6221 11.5546 14.6892 11.1747 14.7203C10.8104 14.75 10.3646 14.75 9.83045 14.75H4.16955C3.6354 14.75 3.18956 14.75 2.82533 14.7203C2.44545 14.6892 2.08879 14.6221 1.75153 14.4503C1.23408 14.1866 0.813385 13.7659 0.549733 13.2485C0.377889 12.9112 0.310778 12.5546 0.27974 12.1747C0.249981 11.8104 0.24999 11.3646 0.25 10.8304V5.16957C0.24999 4.63541 0.249981 4.18956 0.27974 3.82533C0.310778 3.44545 0.377889 3.08879 0.549733 2.75153C0.813385 2.23408 1.23408 1.81338 1.75153 1.54973C2.08879 1.37789 2.44545 1.31078 2.82533 1.27974C3.1289 1.25494 3.48917 1.25081 3.91 1.25013V1C3.91 0.585786 4.24579 0.25 4.66 0.25ZM3.91 2.75019C3.49279 2.75097 3.19037 2.75491 2.94748 2.77476C2.66036 2.79822 2.52307 2.8401 2.43251 2.88624C2.19731 3.00608 2.00608 3.19731 1.88624 3.43251C1.8401 3.52307 1.79822 3.66035 1.77476 3.94748C1.75058 4.24336 1.75 4.62757 1.75 5.2V5.75H12.25V5.2C12.25 4.62757 12.2494 4.24336 12.2252 3.94748C12.2018 3.66035 12.1599 3.52307 12.1138 3.43251C11.9939 3.19731 11.8027 3.00608 11.5675 2.88624C11.4769 2.8401 11.3396 2.79822 11.0525 2.77476C10.8096 2.75491 10.5072 2.75097 10.09 2.75019V3C10.09 3.41421 9.75421 3.75 9.34 3.75C8.92579 3.75 8.59 3.41421 8.59 3V2.75H5.41V3C5.41 3.41421 5.07421 3.75 4.66 3.75C4.24579 3.75 3.91 3.41421 3.91 3V2.75019ZM12.25 7.25H1.75V10.8C1.75 11.3724 1.75058 11.7566 1.77476 12.0525C1.79822 12.3396 1.8401 12.4769 1.88624 12.5675C2.00608 12.8027 2.19731 12.9939 2.43251 13.1138C2.52307 13.1599 2.66036 13.2018 2.94748 13.2252C3.24336 13.2494 3.62757 13.25 4.2 13.25H9.8C10.3724 13.25 10.7566 13.2494 11.0525 13.2252C11.3396 13.2018 11.4769 13.1599 11.5675 13.1138C11.8027 12.9939 11.9939 12.8027 12.1138 12.5675C12.1599 12.4769 12.2018 12.3396 12.2252 12.0525C12.2494 11.7566 12.25 11.3724 12.25 10.8V7.25Z' fill='%23A2A8B4'/%3E%3C/svg%3E%0A");
		width: 14px;
		height: 14px;
		cursor: pointer;
		position: relative;
		right: -4px;
	}

	${({ appearance }) =>
		appearance === 'hide' &&
		`
			&: {
				-moz-appearance:textfield;
			}
			&::-webkit-outer-spin-button,
			&::-webkit-inner-spin-button {
					-webkit-appearance: none;
			}
	`}
`;

const Prefix = styled.span`
	color: ${colors.foregroundPrimary};

	margin-right: -8px;

	position: relative;

	& ~ ${InputElement} {
		margin-left: 0;
	}
`;

export const Error = styled(Caption)`
	display: block;
	position: absolute;
	margin-top: 8px;
	padding-left: 16px;
	min-width: 100%;
	color: ${colors.accentNegativeActive};
	white-space: -moz-pre-space;
`;

const RightIcon = styled.div`
	display: flex;
	align-items: center;
`;
