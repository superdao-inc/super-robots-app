import styled from '@emotion/styled';
import isNil from 'lodash/isNil';
import cn from 'classnames';
import SlickSlider, { Settings as SlickSliderSettings } from 'react-slick';
import React, {
	createRef,
	forwardRef,
	MouseEventHandler,
	PropsWithChildren,
	useImperativeHandle,
	useMemo
} from 'react';
import { borders, colors } from 'src/style';
import 'slick-carousel/slick/slick.css';
import { ArrowLeftIcon } from 'src/components/assets/icons';

const stopPropagation: MouseEventHandler = (event) => {
	event.stopPropagation();
};

export type SliderProps = {
	isSlider?: boolean;
	initialSlideIndex?: number;
	size?: 'sm' | 'md';
	className?: string; // pass styles here
	isFullHeightControls?: boolean; // next and prev cntrols click zone
	maxCountToShowDots?: number;
	sliderClount?: number;
};

export type SliderRefProps = {
	handleSetSlide: (index: number) => void;
};

const sizeSettings = {
	sm: {
		arrows: {
			width: 24,
			height: 24
		}
	},
	md: {
		arrows: {
			width: 32,
			height: 32
		}
	}
};

export const Slider = forwardRef<SliderRefProps, PropsWithChildren<SliderProps>>((props, ref) => {
	const {
		children,
		isSlider = false,
		initialSlideIndex = 0,
		className,
		size = 'sm',
		isFullHeightControls = true,
		sliderClount,
		maxCountToShowDots
	} = props;
	const currentSizeSettings = sizeSettings[size];

	const sliderRef = createRef<SlickSlider>();

	const handleNextSlide: MouseEventHandler = (e) => {
		e.stopPropagation();
		sliderRef.current?.slickNext();
	};

	const handleSetSlide = (index: number) => {
		sliderRef.current?.slickGoTo(index);
	};

	const handlePrevSlide: MouseEventHandler = (e) => {
		e.stopPropagation();
		sliderRef.current?.slickPrev();
	};

	const isShowDots = useMemo(() => {
		if (!isSlider) return false;

		if (!isNil(maxCountToShowDots) && !isNil(sliderClount)) {
			return maxCountToShowDots >= sliderClount;
		}

		return false;
	}, [maxCountToShowDots, sliderClount, isSlider]);

	const settings: SlickSliderSettings = {
		dots: isShowDots,
		customPaging() {
			return (
				<div
					className={cn('bg-foregroundPrimary cursor-pointer rounded-lg', {
						'h-[5px] w-[5px]': size === 'sm',
						'h-2 w-2': size === 'md'
					})}
				/>
			);
		},
		appendDots(dots: React.ReactNode): JSX.Element {
			return <DotsWrapper onClick={stopPropagation}> {dots} </DotsWrapper>;
		},
		initialSlide: initialSlideIndex,
		infinite: true,
		arrows: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	useImperativeHandle(ref, () => ({ handleSetSlide }));

	return (
		<div className={cn('relative', className)}>
			<SlickSlider className="flex flex-nowrap justify-center align-middle" ref={sliderRef} {...settings}>
				{children}
			</SlickSlider>

			{isSlider && (
				<>
					<SliderControl
						className="cursor-pointer"
						side="left"
						isFullHeightControls={isFullHeightControls}
						onClick={handlePrevSlide}
					>
						<StyledArrowIcon {...currentSizeSettings?.arrows} />
					</SliderControl>
					<SliderControl
						className="cursor-pointer"
						side="right"
						isFullHeightControls={isFullHeightControls}
						onClick={handleNextSlide}
					>
						<StyledArrowIcon {...currentSizeSettings?.arrows} />
					</SliderControl>
				</>
			)}
		</div>
	);
});

Slider.displayName = 'Slider';

const DotsWrapper = styled.ul`
	height: initial !important;
	position: absolute;
	bottom: 8px;

	border-radius: ${borders.medium};
	padding: 4px 6px;

	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 4px;

	background: rgba(27, 32, 42, 0.4);

	li {
		opacity: 0.4;
		&.slick-active {
			opacity: 1;
		}
	}
`;

const SliderControl = styled.div<{ side: 'left' | 'right'; isFullHeightControls: boolean }>`
	position: absolute;
	top: 0;
	${({ side }) => (side === 'left' ? `left: 0px` : 'right: 0px')};
	bottom: 0;
	width: 30%;
	transform: ${({ side }) => side === 'left' && 'rotate(180deg)'};

	&:hover {
		background: ${({ isFullHeightControls }) =>
			isFullHeightControls
				? 'radial-gradient(100% 100% at 100% 49.79%, rgba(27, 32, 42, 0.6) 0%, rgba(27, 32, 42, 0) 100%)'
				: 'inherit'};
	}

	${({ isFullHeightControls, side }) =>
		!isFullHeightControls &&
		`
		width: 50px;
		height: 50px;
		top: 50%;
		transform: translate(0, -50%) ${side === 'left' ? 'rotate(180deg)' : ''};
	`}
`;

const StyledArrowIcon = styled(ArrowLeftIcon)`
	position: absolute;
	top: 50%;
	right: 4px;
	transform: translateY(-50%) rotate(180deg);

	fill: rgba(255, 255, 255, 0.5);
	transition: 0.2s ease all;

	filter: drop-shadow(0px 0px 8px #000000);

	&:hover {
		fill: ${colors.foregroundPrimary};
	}
`;
