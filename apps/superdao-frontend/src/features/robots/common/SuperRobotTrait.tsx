import capitalize from 'lodash/capitalize';
import { MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react';
import { HintIcon, NewBody, NewLabel1 } from 'src/components';
import { TooltipContent } from 'src/components/navigation/tooltipContent';
import Tooltip from 'src/components/tooltip';

type Props = {
	icon: ReactNode;
	propertyTrait: {
		trait_type: string;
		value: string;
	};
	hint?: string;
};

const MAX_MOBILE_SCREEN_WIDTH = 500;

export const SuperRobotTrait = (props: Props) => {
	const { icon, propertyTrait, hint } = props;

	const [isTooltipVisible, setIsTooltipVisible] = useState(false);

	const boxRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
	const textRef: MutableRefObject<HTMLSpanElement | null> = useRef(null);

	const [isMobile, setIsMobile] = useState(window.screen.width < MAX_MOBILE_SCREEN_WIDTH);

	useEffect(() => {
		setIsTooltipVisible(
			!!boxRef.current?.clientWidth &&
				!!textRef.current?.clientWidth &&
				boxRef.current.clientWidth - textRef.current.clientWidth <= 60
		);

		const handleResize = () => {
			setIsTooltipVisible(
				!!boxRef.current?.clientWidth &&
					!!textRef.current?.clientWidth &&
					boxRef.current.clientWidth - textRef.current.clientWidth <= 60
			);
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, [textRef, boxRef]);

	useEffect(() => {
		const handleWindowResize = () => {
			setIsMobile(window.screen.width < MAX_MOBILE_SCREEN_WIDTH);
		};

		window.addEventListener('resize', handleWindowResize);

		return () => window.removeEventListener('resize', handleWindowResize);
	}, []);

	const content = (
		<div className="relative flex w-full items-center gap-3 rounded-lg bg-[#FFFFFF0A] px-3 py-[7px]" ref={boxRef}>
			<div className="shrink-0">{icon}</div>
			<div className="w-[calc(100%-24px-12px)] grow-0">
				<div className="flex items-center gap-1">
					<NewBody className="opacity-40">
						{propertyTrait.trait_type === 'BG' || propertyTrait.trait_type === 'ENS'
							? propertyTrait.trait_type
							: capitalize(propertyTrait.trait_type)}
					</NewBody>
					{!!hint && (
						<>
							{
								// desktop
							}
							<Tooltip
								content={<TooltipContent className="500:block hidden !max-w-[230px] text-center" description={hint} />}
								placement="top"
							>
								<HintIcon className="500:block hidden cursor-pointer" width={16} height={16} color="#FFFFFF66" />
							</Tooltip>

							{
								// mobile
							}
							<Tooltip
								content={<TooltipContent className="500:hidden !max-w-[230px] text-center" description={hint} />}
								placement="top-end"
							>
								<HintIcon className="500:hidden cursor-pointer" width={16} height={16} color="#FFFFFF66" />
							</Tooltip>
						</>
					)}
				</div>
				<NewLabel1 ref={textRef} className="w-max max-w-full truncate font-normal">
					{propertyTrait.value}
				</NewLabel1>
			</div>
		</div>
	);

	if (isTooltipVisible) {
		return (
			<Tooltip content={<TooltipContent title={propertyTrait.value} />} placement={isMobile ? 'bottom-end' : 'bottom'}>
				{content}
			</Tooltip>
		);
	}

	return content;
};
