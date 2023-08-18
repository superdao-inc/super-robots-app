import React, { forwardRef, HTMLAttributes, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';

import { Label } from './input';
import { colors } from 'src/style';
import { Body, Caption, SubHeading } from 'src/components/text';
import { useCombinedRefs } from 'src/hooks/refs';

const MAX_HEIGHT = 380;

type Props = HTMLAttributes<HTMLTextAreaElement> & {
	label?: string;
	info?: string;
	description?: string;
	error?: string;
	placeholder?: string;
	maxLength?: number;
	isCounterVisible?: boolean;
	errorClassName?: string;
	disableMinHeight?: boolean;
	rows?: number;
	labelClassName?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
	(
		{
			label,
			info,
			description,
			placeholder,
			error,
			children,
			maxLength,
			isCounterVisible,
			errorClassName,
			rows = 5,
			disableMinHeight = false,
			labelClassName,
			...rest
		},
		ref
	) => {
		const [contentLength, setContentLength] = useState(0);

		const innerRef = useRef<HTMLTextAreaElement>(null);
		const combinedRef = useCombinedRefs<HTMLTextAreaElement>(ref, innerRef);

		const resizeTextarea = (
			e?:
				| React.KeyboardEvent<HTMLTextAreaElement>
				| React.ChangeEvent<HTMLTextAreaElement>
				| React.ClipboardEvent<HTMLTextAreaElement>
		) => {
			if (e) {
				e.persist();
				setContentLength(e.currentTarget.value.length);
			}

			setTimeout(() => {
				const el = innerRef.current;

				if (el) {
					if (el.scrollHeight >= MAX_HEIGHT) {
						el.style.overflow = 'unset';
						el.style.maxHeight = `${MAX_HEIGHT}px`;
					}

					el.style.height = 'inherit';
					el.style.height = `${el.scrollHeight}px`;
				}
			}, 1);
		};

		useEffect(() => resizeTextarea(), []);

		const color: string = useMemo(() => {
			if (!maxLength) return '';

			if (maxLength - contentLength >= 10) {
				return colors.foregroundTertiary;
			}
			return maxLength - contentLength === 0 ? colors.accentNegative : colors.accentPrimary;
		}, [contentLength, maxLength]);

		return (
			<Wrapper>
				{label && (
					<Label>
						{label} {info && <span className="text-foregroundSecondary">{info}</span>}
					</Label>
				)}
				{description && (
					<SubHeading color={colors.foregroundTertiary} className="mb-3">
						{description}
					</SubHeading>
				)}

				<StyledTextarea
					ref={combinedRef}
					placeholder={placeholder}
					onKeyDown={resizeTextarea}
					onKeyUp={resizeTextarea}
					onChange={resizeTextarea}
					onPaste={resizeTextarea}
					hasError={!!error}
					maxLength={maxLength}
					rows={rows}
					disableMinHeight={disableMinHeight}
					{...rest}
				>
					{children}
				</StyledTextarea>

				{error && <StyledError className={errorClassName}>{error}</StyledError>}
				{isCounterVisible && maxLength && <Counter color={color}>{maxLength - contentLength}</Counter>}
			</Wrapper>
		);
	}
);

Textarea.displayName = 'Textarea';

const Wrapper = styled.div`
	width: 100%;
	position: relative;
`;

export const StyledTextarea = styled.textarea<{ hasError: boolean; disableMinHeight: boolean }>`
	display: block;
	border: unset;
	outline: none;
	resize: none;
	overflow: hidden;
	width: 100%;
	min-height: ${(props) => (props.disableMinHeight ? 'auto' : '140px')};

	padding: 8px 16px;

	color: ${colors.foregroundPrimary};
	background: ${colors.overlaySecondary};
	border-radius: 8px;

	&:focus {
		box-shadow: none;
	}

	&::placeholder {
		color: ${(props) => (props.hasError ? colors.errorDefault : colors.foregroundTertiary)};
	}

	// Body
	font-family: 'Space Mono', monospace;
	font-size: 15px;
	line-height: 24px;
	font-weight: 400;
`;

const StyledError = styled(Caption)`
	display: block;
	position: absolute;
	margin-top: 8px;
	padding-left: 16px;

	color: ${colors.errorDefault};
`;

const Counter = styled(Body)`
	position: absolute;
	right: 16px;
	bottom: 8px;
`;
