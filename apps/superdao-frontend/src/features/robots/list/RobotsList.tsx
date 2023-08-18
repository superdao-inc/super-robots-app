import { NewTitle1 } from 'src/components';
import { RobotCard } from '../card/RobotCard';
import { RobotsCta } from '../cta/RobotsCta';
import { EmptyRobotsList } from './EmptyRobotsList';
import { RobotMintIsInProgressCard } from '../card/RobotMintIsInProgressCard';

type Props = {
	robotMintIsInProgress: boolean;
	robotTokens: string[];
	isUsingOddVersion: boolean;
};

export const RobotsList = (props: Props) => {
	const { robotTokens, isUsingOddVersion, robotMintIsInProgress } = props;

	if (!robotTokens.length && !robotMintIsInProgress) return <EmptyRobotsList />;

	return (
		<div className="1280:py-[64px] 1280:max-w-[1000px] 768:max-w-[664px] mx-auto max-w-[280px] py-10">
			<NewTitle1 className="mb-8">My Robots</NewTitle1>
			<div className="768:gap-6 1280:gap-8 flex flex-wrap gap-4">
				{robotMintIsInProgress && <RobotMintIsInProgressCard isUsingOddVersion={isUsingOddVersion} />}
				{robotTokens.map((token) => (
					<RobotCard key={token} tokenId={token} isUsingOddVersion={isUsingOddVersion} />
				))}
				<RobotsCta />
			</div>
		</div>
	);
};
