import {
	forwardRef,
	useMemo,
	PropsWithChildren,
	ReactElement,
	useRef,
	useCallback,
	useEffect,
	ElementType
} from 'react';
import { createPortal } from 'react-dom';
import { Manager, Reference, Popper, PopperProps, Modifier } from 'react-popper';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { colors, borders } from 'src/style';
import { getDomContainer } from 'src/utils/getDomContaner';

type ArrowPlacementsOptions = 'left' | 'right';

export type DropdownProps = Omit<PopperProps<any>, 'children'> &
	PropsWithChildren<{
		content: ReactElement;
		customWrapper?: ElementType;
		isOpen: boolean;
		onClickOutside?: (event: MouseEvent) => void;
		containerElement?: Element;
		maxHeight?: number;
		className?: string;
		contentClassName?: string;
		arrowPlacement?: ArrowPlacementsOptions;
	}>;

export const Dropdown = forwardRef<HTMLElement, DropdownProps>((props, popperRef) => {
	const {
		children,
		content,
		containerElement,
		isOpen = false,
		onClickOutside,
		maxHeight,
		customWrapper,
		className,
		contentClassName,
		modifiers,
		arrowPlacement = 'left',
		...popperProps
	} = props;

	const contentContainerEl = useMemo(() => getDomContainer(containerElement), [containerElement]);

	const dropdownWrapperRef = useRef<HTMLDivElement>(null);
	const dropdownContentWrapperRef = useRef<HTMLDivElement>(null);

	const ContentWrapper = customWrapper || ContentWrapperDefault;

	const handleOuterClick = useCallback(
		(event: MouseEvent) => {
			const targetElement = event.target instanceof Element ? event.target : null;

			if (targetElement) {
				const ownElementsList = [dropdownWrapperRef, dropdownContentWrapperRef];
				const isOuterClick = ownElementsList.every((element) => !element.current?.contains(targetElement));

				if (isOuterClick) {
					onClickOutside?.(event);
				}
			}
		},
		[onClickOutside]
	);

	useEffect(() => {
		document.addEventListener('click', handleOuterClick);
		return () => {
			document.removeEventListener('click', handleOuterClick);
		};
	}, [handleOuterClick]);

	const enhancedModifiers = useMemo<Modifier<unknown>[]>(
		() => [{ name: 'offset', options: { offset: [0, 8] } }, ...(modifiers ?? [])],
		[modifiers]
	);

	const withArrow = useMemo<boolean>(() => !!modifiers?.find(({ name }) => name === 'arrow'), [modifiers]);

	const arrowClassName = {
		left: 'border-r-backgroundTertiary -left-[12px] border-[6px] border-y-transparent border-l-transparent',
		right: 'border-l-backgroundTertiary -right-[12px] border-[6px] border-y-transparent border-r-transparent'
	};

	return (
		<Manager>
			<div className={className} ref={dropdownWrapperRef}>
				<>
					<Reference>{({ ref }) => <Control ref={ref}>{children}</Control>}</Reference>
					{isOpen &&
						!!contentContainerEl &&
						createPortal(
							<Popper innerRef={popperRef} {...popperProps} modifiers={enhancedModifiers}>
								{({ arrowProps, ...popperChildrenProps }) => (
									<ContentWrapper ref={dropdownContentWrapperRef}>
										<Content {...popperChildrenProps} className={contentClassName} maxHeight={maxHeight}>
											{content ?? ''}
											{withArrow && <div className={arrowClassName[arrowPlacement]} {...arrowProps} />}
										</Content>
									</ContentWrapper>
								)}
							</Popper>,
							contentContainerEl
						)}
				</>
			</div>
		</Manager>
	);
});

Dropdown.displayName = 'Dropdown';

const Control = styled.div`
	background: transparent;
	border: none;
	padding: 0;
	margin: 0;
`;

export const dropdownContentPadding: number = 8;

const ContentWrapperDefault = styled.div`
	overflow: auto;
`;

const getDropdownScrollCss = (maxHeight?: number) =>
	maxHeight &&
	css`
		max-height: ${maxHeight}px;
		overflow-x: scroll;
	`;

const Content = styled.div<Pick<DropdownProps, 'maxHeight'>>`
	color: ${colors.foregroundPrimary};
	background-color: ${colors.backgroundTertiary};
	border-radius: ${borders.medium};
	margin: 0;
	padding: ${dropdownContentPadding}px 0;
	${({ maxHeight }) => getDropdownScrollCss(maxHeight)};
	box-shadow: 0 8px 48px rgba(0, 0, 0, 0.16), 0 0 96px rgba(0, 0, 0, 0.08);
	z-index: 20;
`;
