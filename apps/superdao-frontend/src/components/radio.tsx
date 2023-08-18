import { forwardRef, HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { colors } from 'src/style';

type RadioProps = HTMLAttributes<HTMLInputElement> & {
	name: string;
	checked?: boolean;
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
	const { children, name, className, ...rest } = props;
	return (
		<Label className={className}>
			<Input ref={ref} name={name} {...rest} />
			<Button>
				<Dot />
				<Content>{children}</Content>
			</Button>
		</Label>
	);
});

const Button = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 7px;
`;

const Label = styled.label`
	&:last-child {
		&& ${Button} {
			margin-bottom: 0;
		}
	}

	&:hover {
		cursor: pointer;
	}
`;

const Dot = styled.div`
	width: 22px;
	height: 22px;
	margin-right: 7px;
	border-radius: 50%;
	border-style: solid;
	border-width: 1px;
	border-color: ${colors.foregroundTertiary};
`;

const Content = styled.div``;

const Input = styled.input`
	appearance: none;
	display: none;

	&:checked {
		& + ${Button} {
			${Dot} {
				border-width: 7px;
				border-color: ${colors.accentPrimary};
			}
		}
	}
`;
Input.defaultProps = { type: 'radio' };
