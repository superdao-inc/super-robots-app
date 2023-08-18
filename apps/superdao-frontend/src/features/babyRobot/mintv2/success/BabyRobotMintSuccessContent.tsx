import { Display3, Title1 } from 'src/components';
import { RobotLayerDisplay } from 'src/features/robotsCommon/RobotLayerDisplay';

type Props = {
	isUsingOddVersion: boolean;
	imageName: string;
};

export const BabyRobotMintSuccessContent = (props: Props) => {
	const { isUsingOddVersion, imageName } = props;

	return (
		<div className="500:pb-0 500:mt-0 mt-[20px] flex flex-wrap pb-[calc(56px+16px+56px+16px+20px)]">
			<div className="768:mt-0 z-1 960:w-full relative mx-auto mt-8 flex items-center justify-center">
				<div className="500:h-[464px] 500:w-[464px] h-[280px] w-[280px]">
					<RobotLayerDisplay
						imageName={imageName}
						isUsingOddVersion={isUsingOddVersion}
						className="bg-backgroundPrimary rounded-[24px]"
					/>
				</div>
			</div>
			<div className="500:mt-[32px] mx-auto mt-[24px] w-max">
				<Title1 className="960:text-[32px] 960:leading-10 px-4 text-center text-[24px]	font-black leading-[32px]">
					Your Robot is ready&nbsp;🎉
				</Title1>
				<Display3 className="text-foregroundPrimary 960:text-[16px] 500:w-max mx-auto mt-4 w-[280px] text-center text-[16px] leading-[24px] text-opacity-70">
					NFT will reach your wallet in a few minutes
				</Display3>
			</div>
		</div>
	);
};
