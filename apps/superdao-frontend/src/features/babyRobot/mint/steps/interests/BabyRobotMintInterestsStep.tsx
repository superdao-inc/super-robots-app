import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { BabyRobotMintInterestsSubmitButton } from 'src/features/babyRobot/mint/steps/interests/BabyRobotMintInterestsSubmitButton';
import { interests } from 'src/features/babyRobot/mint/steps/interests/constants';
import { Display2 } from 'src/components';

import { BabyRobotInterests } from './BabyRobotMintInterests';

type Props = {
	onSubmit: (interests: string[]) => void;
};

export const BabyRobotMintInterestsStep = (props: Props) => {
	const { onSubmit } = props;

	const { t } = useTranslation();

	const [interestsMap, setInterestsMap] = useState(
		interests.reduce((acc, interest) => {
			acc[interest] = false;
			return acc;
		}, {} as { [key: string]: boolean })
	);

	const handleSubmit = () => {
		onSubmit(Object.keys(interestsMap).filter((k) => interestsMap[k]));
	};

	return (
		<div className="min-h-[calc(100vh-112px)] pb-[100px] sm:min-h-[calc(100vh-146px)] sm:pt-10 sm:pb-[132px]">
			<div className="pt-6">
				<Display2 className="mx-auto w-max text-[24px] leading-[28px] sm:text-[28px] sm:leading-[34px]">
					{t('features.babyRobots.mint.steps.interests.title')}
				</Display2>

				<BabyRobotInterests isActive interestsMap={interestsMap} setInterestsMap={setInterestsMap} />

				<div className="absolute bottom-4 left-0 w-full px-4 sm:bottom-12">
					<BabyRobotMintInterestsSubmitButton handleSubmit={handleSubmit} disabled={false} isLoading={false} />
				</div>
			</div>
		</div>
	);
};
