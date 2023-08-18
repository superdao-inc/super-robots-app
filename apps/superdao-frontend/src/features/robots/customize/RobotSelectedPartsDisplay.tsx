import { Title3 } from 'src/components';
import { useRobotAssetsMappingQuery } from 'src/gql/babyRobot.generated';
import { SelectedRobotPart } from './SelectedRobotPart';

type Props = {
	isUsingOddVersion: boolean;
	customParts: {
		bg: string;
		eyes: string;
		tubes: string;
		body: string;
		legs: string;
	};
};

export const RobotSelectedPartsDisplay = ({ isUsingOddVersion, customParts }: Props) => {
	// TODO: get translations from config
	const { data: robotAssetsMapping } = useRobotAssetsMappingQuery({}, { select: (data) => data.robotAssetsMapping });

	const { bg, eyes, tubes, body, legs } = customParts;

	return (
		<div className="relative">
			<Title3 className="text-base">Items</Title3>
			<div className="children:w-full mt-4 flex flex-wrap gap-4">
				<SelectedRobotPart
					isUsingOddVersion={isUsingOddVersion}
					item={bg}
					translation={robotAssetsMapping?.['BG'].find((elem) => elem.path === bg)?.translation ?? ''}
				/>
				<SelectedRobotPart
					isUsingOddVersion={isUsingOddVersion}
					item={body}
					translation={robotAssetsMapping?.['BODY'].find((elem) => elem.path === body)?.translation ?? ''}
				/>
				<SelectedRobotPart
					isUsingOddVersion={isUsingOddVersion}
					item={eyes}
					translation={robotAssetsMapping?.['EYES'].find((elem) => elem.path === eyes)?.translation ?? ''}
				/>
				<SelectedRobotPart
					isUsingOddVersion={isUsingOddVersion}
					item={tubes}
					translation={robotAssetsMapping?.['TUBES'].find((elem) => elem.path === tubes)?.translation ?? ''}
				/>
				<SelectedRobotPart
					isUsingOddVersion={isUsingOddVersion}
					item={legs}
					translation={robotAssetsMapping?.['LEGS'].find((elem) => elem.path === legs)?.translation ?? ''}
				/>
			</div>
		</div>
	);
};
