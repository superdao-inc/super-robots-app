import React, {
	ElementType,
	HTMLAttributes,
	memo,
	MouseEvent,
	MouseEventHandler,
	ReactElement,
	useCallback,
	useEffect
} from 'react';
import styled from '@emotion/styled';

import { Dropdown, DropdownProps } from '../dropdown';
import { SubHeading } from '../text';
import { Cell, CellProps, CellSize } from 'src/components/cell';
import { MoreIcon } from 'src/components/assets/icons';
import { useSwitch } from 'src/hooks/use-switch';
import { colors } from 'src/style';

type Option = Omit<CellProps, 'label' | 'size'> & { label: string; size?: CellSize };

type DropdownMenuProps = HTMLAttributes<HTMLElement> &
	Pick<DropdownProps, 'placement' | 'contentClassName'> & {
		control?: ReactElement;
		customWrapper?: ElementType;
		options: Option[];
		shouldCloseOnSelect?: boolean;
		onSwitch?: (isOpen: boolean) => void;
	};

const DropdownMenu = (props: DropdownMenuProps) => {
	const {
		contentClassName,
		control,
		customWrapper,
		options,
		placement,
		shouldCloseOnSelect = true,
		onClick,
		onSwitch,
		...rest
	} = props;

	const [isOpen, { toggle, off }] = useSwitch(false);

	// detect switch from the outside
	useEffect(() => {
		if (onSwitch) onSwitch(isOpen);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	const handleClick = useCallback<MouseEventHandler<HTMLElement>>(
		(event) => {
			event.preventDefault();
			toggle();
			onClick?.(event);
		},
		[toggle, onClick]
	);

	const handleOptionClick = (option: Option) => (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (!option.disabled) {
			option.onClick?.(event);
			if (shouldCloseOnSelect) off();
		}
	};

	return (
		<Dropdown
			isOpen={isOpen}
			onClickOutside={off}
			placement={placement ?? 'bottom-end'}
			customWrapper={customWrapper}
			className="h-7"
			contentClassName={contentClassName}
			content={
				<>
					{options.map((option) => (
						<StyledCell
							key={option.label}
							{...option}
							size={option.size || 'sm'}
							label={<SubHeading color={option.color}>{option.label}</SubHeading>}
							onClick={handleOptionClick(option)}
							data-testid={`DropdownMenu__${option.label.toLowerCase()}`}
						/>
					))}
				</>
			}
		>
			{control ? (
				React.cloneElement(control, { ...rest, isOpen, onClick: handleClick })
			) : (
				<Button {...rest} onClick={handleClick}>
					<MoreIcon fill={colors.foregroundTertiary} />
				</Button>
			)}
		</Dropdown>
	);
};

const StyledCell = styled(Cell)`
	&:hover {
		cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
		background: ${colors.backgroundTertiaryHover};
	}
`;

const Button = styled.button`
	width: 28px;
	height: 28px;
	border-radius: 50%;
	background-color: transparent;
	transition: background-color 300ms;
	padding: 0;
	border: none;
	display: inline-flex;
	align-items: center;
	justify-content: center;

	&:hover {
		cursor: pointer;
		background: ${colors.backgroundTertiaryHover};
	}
`;

export default memo(DropdownMenu);
