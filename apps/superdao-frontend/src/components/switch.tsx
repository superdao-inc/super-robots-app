import { forwardRef, HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { colors } from 'src/style';

type SwitchProps = HTMLAttributes<HTMLInputElement> & {
	childrenPosition?: 'before' | 'after';
	withoutPadding?: boolean;
	dataTestId?: string;
	wrapperClassName?: string;
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, innerRef) => {
	const {
		children,
		childrenPosition = 'before',
		withoutPadding = false,
		dataTestId,
		wrapperClassName = '',
		...restProps
	} = props;

	return (
		<SwitchElement data-testid={dataTestId} className={wrapperClassName}>
			{childrenPosition === 'before' && children && <Label withoutPadding={withoutPadding}>{children}</Label>}
			<Input ref={innerRef} {...restProps} />
			<Toggle>
				<Button />
			</Toggle>
			{childrenPosition === 'after' && children && <Label withoutPadding={withoutPadding}>{children}</Label>}
		</SwitchElement>
	);
});

const SWITCH_ANIMATION_SPEED = 100; // ms
const TOGGLE_BORDER_WIDTH = 2; // px
const TOGGLE_WIDTH = 20; // px
const SWITCH_WIDTH = 2 * TOGGLE_WIDTH + TOGGLE_BORDER_WIDTH;

const SwitchElement = styled.label`
	display: flex;
	align-items: center;
	user-select: none;

	&:hover {
		cursor: pointer;
	}
`;

const Label = styled.div<{ withoutPadding?: boolean }>`
	padding: ${({ withoutPadding }) => (withoutPadding ? '0' : '0 8px')};
`;

const Toggle = styled.div`
	width: ${SWITCH_WIDTH}px;
	border-radius: ${SWITCH_WIDTH}px;
	transition: background-color ${SWITCH_ANIMATION_SPEED}ms ease-in-out;
	border: ${TOGGLE_BORDER_WIDTH}px solid transparent;
`;

const Button = styled.div`
	width: ${TOGGLE_WIDTH}px;
	height: ${TOGGLE_WIDTH}px;
	border-radius: 50%;
	background-color: ${colors.backgroundPrimary};
	will-change: transform;
	transition: transform ${SWITCH_ANIMATION_SPEED}ms ease-in-out;
`;

const Input = styled.input`
	display: none;
	appearance: none;

	& + ${Toggle} {
		background-color: ${colors.overlayQuinary};
	}

	&:checked {
		& + ${Toggle} {
			background-color: ${colors.accentPrimary};

			& ${Button} {
				transform: translateX(18px);
			}
		}
	}
`;
Input.defaultProps = {
	type: 'checkbox'
};
