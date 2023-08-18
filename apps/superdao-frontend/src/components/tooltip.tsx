import { FC, ReactNode, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';
import { createPortal } from 'react-dom';
import { colors } from 'src/style';
import { useSwitch } from 'src/hooks';

export type TooltipProps = {
	content: ReactNode;
	placement: Placement;
	className?: string;
	followMouse?: boolean;
	backgroundColor?: string;
	isDefaultShown?: boolean;
	isVisible?: boolean;
	children?: ReactNode;
};

const Tooltip: FC<TooltipProps> = (props) => {
	const {
		className,
		content,
		placement,
		followMouse,
		children,
		backgroundColor,
		isDefaultShown = false,
		isVisible = true
	} = props;

	const [isShown, { on: showTooltip, off: hideTooltip }] = useSwitch(isDefaultShown);

	const [targetEl, setTargetEl] = useState<HTMLDivElement | null>(null);
	const [tooltipEl, setTooltipEl] = useState<HTMLDivElement | null>(null);
	const [arrowEl, setArrowEl] = useState<HTMLDivElement | null>(null);

	const [isTooltipMounted, setIsTooltipMounted] = useState(false);
	useEffect(() => {
		setIsTooltipMounted(true);
	}, []);

	const topOffset = 20;

	const generateGetBoundingClientRect =
		(x = 0, y = 0) =>
		() => ({
			width: 0,
			height: 0,
			top: y + topOffset,
			right: x,
			bottom: y,
			left: x,
			x,
			y,
			toJSON: () => {}
		});

	const popper = usePopper(targetEl, tooltipEl, {
		placement,
		modifiers: [
			{
				name: 'arrow',
				options: {
					element: arrowEl,
					padding: 6
				}
			},

			{
				name: 'offset',
				options: {
					offset: [0, 8]
				}
			}
		]
	});

	useEffect(() => {
		const listener = ({ clientX: x, clientY: y }: MouseEvent) => {
			targetEl!.getBoundingClientRect = generateGetBoundingClientRect(x, y);
			popper.update!();
		};

		if (targetEl && popper.update && followMouse) {
			targetEl.addEventListener('mousemove', listener);
		}

		return () => targetEl?.removeEventListener('mousemove', listener);
	}, [popper, targetEl, followMouse]);

	return (
		<>
			<div
				ref={setTargetEl}
				onClick={isDefaultShown || !isVisible ? hideTooltip : undefined}
				className={className}
				onMouseEnter={showTooltip}
				onMouseLeave={hideTooltip}
			>
				{children}
			</div>

			{isTooltipMounted &&
				isShown &&
				isVisible &&
				createPortal(
					<StyledTooltip
						isShown={isShown}
						ref={setTooltipEl}
						style={popper.styles.popper}
						backgroundColor={backgroundColor || colors.backgroundQuaternary}
						onClick={isDefaultShown || !isVisible ? hideTooltip : undefined}
						{...popper.attributes.popper}
					>
						{content}
						<StyledArrow isShown={isShown} ref={setArrowEl} {...popper.attributes.popper} style={popper.styles.arrow} />
					</StyledTooltip>,
					document.body
				)}
		</>
	);
};

const StyledTooltip = styled.div<{ isShown: boolean; backgroundColor: string }>`
	background-color: ${({ backgroundColor }) => backgroundColor};
	color: ${colors.foregroundPrimary};

	border-radius: 8px;
	padding: 6px 12px;

	vertical-align: middle;
	width: fit-content;
	white-space: nowrap;
	z-index: 1000;

	visibility: ${({ isShown }) => (isShown ? 'visible' : 'hidden')};
`;

const arrowOffset: string = '-1px';

const StyledArrow = styled.div<{ isShown: boolean }>`
	z-index: -1;
	visibility: hidden;

	&,
	&::before {
		position: absolute;
		width: 20px;
		height: 20px;
		border-radius: 2px;
		background: inherit;
	}

	&::before {
		visibility: ${({ isShown }) => (isShown ? 'visible' : 'hidden')};
		content: '';
		transform: rotate(45deg);
	}

	&[data-popper-placement^='top'] {
		bottom: ${arrowOffset};
	}
	&[data-popper-placement^='bottom'] {
		top: ${arrowOffset};
	}
	&[data-popper-placement^='left'] {
		right: ${arrowOffset};
	}
	&[data-popper-placement^='right'] {
		left: ${arrowOffset};
	}
`;

export default Tooltip;
