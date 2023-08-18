import { SuperRobotAnimation } from './process/SuperRobotAnimation';
import { SuperRobotMintProcess } from './process/SuperRobotMintProcess';

type Props = {
	isMintTurnedOff: boolean;
	isInviteFlowOn: boolean;
};

export const BabyRobotMintV2 = ({ isMintTurnedOff, isInviteFlowOn }: Props) => {
	return (
		<div className="z-1 relative h-full w-full">
			<SuperRobotAnimation />

			<SuperRobotMintProcess isInviteFlowOn={isInviteFlowOn} isMintTurnedOff={isMintTurnedOff} />
		</div>
	);
};
