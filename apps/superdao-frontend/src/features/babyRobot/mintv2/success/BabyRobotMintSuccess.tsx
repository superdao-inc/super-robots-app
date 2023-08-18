import { BabyRobotMintSuccessActions } from './BabyRobotMintSuccessActions';
import { BabyRobotMintSuccessContent } from './BabyRobotMintSuccessContent';

type Props = {
	isUsingOddVersion: boolean;
	imageName: string;
};

export const BabyRobotMintSuccess = (props: Props) => {
	const { isUsingOddVersion, imageName } = props;

	return (
		<div>
			<BabyRobotMintSuccessContent isUsingOddVersion={isUsingOddVersion} imageName={imageName} />
			<BabyRobotMintSuccessActions />
		</div>
	);
};
