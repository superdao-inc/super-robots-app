import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

import { Body, Title1 } from 'src/components';

type Props = {
	progress: number;
};

export const BabyRobotMintProgressBar = (props: Props) => {
	const { progress } = props;

	const { t } = useTranslation();

	return (
		<div className="bg-backgroundSecondary mx-auto h-[88px] w-full px-3 py-2 sm:mt-5 sm:h-[126px] sm:w-[480px] sm:rounded-lg sm:px-4 sm:py-3">
			<div className="bg-backgroundTertiary relative h-1 w-full overflow-hidden rounded-full sm:h-[6px]">
				<div
					className={cn('bg-tintCyan transtion-all h-full w-1/2 rounded-full', {
						'!w-full': progress === 2
					})}
				></div>
			</div>
			<div className="mt-3 flex gap-4">
				<div className="bg-robotGreen relative flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-lg sm:h-20 sm:w-20">
					<Image layout="fill" src="/assets/babyRobot.png" alt="Super Robot" />
				</div>
				<div className="w-full">
					<Title1 className="mt-1 text-[17px] leading-[21px] sm:mt-[10px] sm:text-[24px] sm:leading-[32px]">
						{t('features.babyRobots.mint.progress.title')}
					</Title1>
					<Body className="text-foregroundSecondary mt-1 max-w-full truncate text-[13px] leading-[18px] sm:mt-2 sm:text-[15px] sm:leading-[24px]">
						{t('features.babyRobots.mint.progress.description')}
					</Body>
				</div>
			</div>
		</div>
	);
};
