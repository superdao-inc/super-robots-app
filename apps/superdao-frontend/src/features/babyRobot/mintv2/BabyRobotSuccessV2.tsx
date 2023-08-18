import { BabyRobotMintSuccess } from './success/BabyRobotMintSuccess';

type Props = {
	isUsingOddVersion: boolean;
	imageName: string;
};

export const BabyRobotSuccessV2 = (props: Props) => {
	const { isUsingOddVersion, imageName } = props;

	return (
		<div className="768:px-[40px] 1280:px-[60px] flex flex-col flex-wrap justify-center">
			<div className="z-1 relative w-full">
				<BabyRobotMintSuccess isUsingOddVersion={isUsingOddVersion} imageName={imageName} />
			</div>
		</div>
	);
};
