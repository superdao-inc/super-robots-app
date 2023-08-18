import { memo } from 'react';
import { useTranslation } from 'next-i18next';
import { Display2, Display3 } from 'src/components';

type Props = {
	babyRobotUrl: string;
};

const BabyRobotSuccess = (props: Props) => {
	const { babyRobotUrl } = props;
	const { t } = useTranslation();

	return (
		<div className="pt-2 sm:pt-9">
			<img src="/assets/superdao.png" alt="Superdao" className="z-2 relative mx-auto" />
			<div className="xm:px-0 relative mx-auto flex w-full max-w-[408px] flex-col flex-wrap">
				<div className="border-robotAccent relative order-2 mx-auto mt-[28px] h-[328px] w-[328px] overflow-hidden rounded-3xl border-2 sm:order-1 sm:mt-[60px] sm:h-[408px] sm:w-full sm:rounded-3xl sm:border-4">
					<div className="bg-robotAccent z-1 absolute top-1/2 left-1/2 hidden h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 blur-[200px] sm:block"></div>
					<img src={babyRobotUrl} className="z-2 relative h-full w-full object-cover" alt="Super Robot" />
				</div>
				<div className="z-2 order-1 sm:order-2">
					<Display2 className="sm:text-[28px]' mx-auto mt-6 w-max text-[24px] leading-[28px] leading-[34px] sm:mt-10">
						{t('features.babyRobots.success.title')}
					</Display2>
					<Display3 className="text-foregroundSecondary mx-auto mt-2 w-[336px] text-center text-[15px] leading-[24px] leading-[28px] sm:w-[382px] sm:text-[17px]">
						{t('features.babyRobots.success.text')}
					</Display3>
				</div>
				<div className="z-2 order-3 flex flex-col items-center pt-14 pb-6">
					<a
						href="https://help.superdao.co/nfts/unhiding-nfts-on-opensea"
						target="_blank"
						className="mt-5"
						rel="noreferrer"
					>
						<Display3 className="text-foregroundSecondary mx-auto w-[336px] text-center text-[15px] leading-[24px] leading-[28px] sm:w-[382px] sm:text-[17px]">
							How to show it on OpenSea
						</Display3>
					</a>
				</div>
			</div>
		</div>
	);
};

export default memo(BabyRobotSuccess);
