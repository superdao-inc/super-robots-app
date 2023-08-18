import { forwardRef, HTMLAttributes } from 'react';
import styled from '@emotion/styled';

import { colors, borders } from 'src/style';

type CheckboxProps = HTMLAttributes<HTMLInputElement> & {
	checked?: boolean;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
	const { children, ...restProps } = props;

	return (
		<Label>
			<Input ref={ref} {...restProps} />
			<Check />
			{children && <Content>{children}</Content>}
		</Label>
	);
});

Checkbox.displayName = 'Checkbox';

const Label = styled.label`
	display: flex;
	align-items: center;

	&:hover {
		cursor: pointer;
	}
`;

const Check = styled.span``;

const Content = styled.span`
	padding-left: 7px;
`;

const Input = styled.input`
	position: absolute;
	display: none;
	appearance: none;

	& + ${Check} {
		display: inline-block;
		width: 20px;
		height: 20px;
		border-radius: ${borders.small};
		border: 1px solid ${colors.foregroundTertiary};
		background-color: transparent;
	}

	&:checked {
		& + ${Check} {
			border: none;
			background: url("data:image/svg+xml,%3Csvg width='11' height='8' viewBox='0 0 11 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.5 4.5L4 7L10 1' stroke='%231B202A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A")
					center no-repeat,
				${colors.accentPrimary};
		}
	}
`;

Input.defaultProps = {
	type: 'checkbox'
};
