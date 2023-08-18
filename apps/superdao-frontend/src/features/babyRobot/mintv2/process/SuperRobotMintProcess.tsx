import { NewLabel1, NewTitle1 } from 'src/components';
import { BabyRobotMintProcessActionsWrapper } from './BabyRobotMintProcessActionsWrapper';
import { BabyRobotMintProcessMintCount } from './BabyRobotMintProcessMintCount';
import { IsMintEnabledLabel } from './IsMintEnabledLabel';
import { SuperRobotActionContent } from './SuperRobotActionsContent';

type Props = {
	isMintTurnedOff: boolean;
	isInviteFlowOn: boolean;
};

export const SuperRobotMintProcess = ({ isMintTurnedOff, isInviteFlowOn }: Props) => {
	return (
		<div className="744:pt-[64px] 744:pb-[calc(720px+116px)] 1280:pb-[calc(64px+40px+64px)] 1280:flex 1280:items-center 1280:px-[80px] relative h-full w-full pt-10 pb-[calc(320px+104px)]">
			<div>
				<IsMintEnabledLabel isMintTurnedOff={isMintTurnedOff} />
				<NewTitle1 className="1280:text-start 1280:mx-0 744:text-[76px] 744:leading-[84px] 744:w-[500px] mx-auto mt-4 w-[209px] text-center">
					Get Your Super Robot
				</NewTitle1>
				<NewLabel1 className="744:mt-6 744:w-[603px] 1280:text-start 744:text-2xl 744:block mx-auto mt-4 hidden w-[280px] text-center font-normal">
					Collect and customize digital characters First mint is free, no gas fees
				</NewLabel1>
				<NewLabel1 className="744:hidden mx-auto mt-4 w-[280px] text-center font-normal">
					Collect and customize digital characters
					<br />
					First mint is free, no gas fees
				</NewLabel1>
				<div className="1280:max-w-max">
					<BabyRobotMintProcessActionsWrapper
						isInviteFlowOn={isInviteFlowOn}
						ActionsComponent={SuperRobotActionContent}
						isMintTurnedOff={isMintTurnedOff}
					/>
				</div>
			</div>
			<div className="1280:bottom-[64px] 1280:justify-start 1280:px-[80px] absolute bottom-10 left-0 flex w-full justify-center">
				<BabyRobotMintProcessMintCount />
			</div>
		</div>
	);
};
