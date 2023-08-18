import { memo, useMemo, useState } from 'react';

import { useRouter } from 'next/router';
import { BabyRobotMintInterestsStep } from './steps/interests/BabyRobotMintInterestsStep';
import { BabyRobotMintProgressBar } from './BabyRobotMintProgressBar';
import { CloseControl } from '../CloseControl';

enum STEPS {
	INTERESTS = 'interests',
	OFFERS = 'offers'
}

const BabyRobotMint = () => {
	const { push } = useRouter();

	const [step, setStep] = useState(STEPS.INTERESTS);

	const handleSubmitInterestsStep = () => {
		setStep(STEPS.OFFERS);
	};

	const handleRedirectToMain = () => {
		push('/');
	};

	const currentStep = useMemo(() => {
		switch (step) {
			case STEPS.INTERESTS:
				return (
					<>
						<BabyRobotMintProgressBar progress={1} />
						<BabyRobotMintInterestsStep onSubmit={handleSubmitInterestsStep} />
						<CloseControl onClick={handleRedirectToMain} />
					</>
				);
			case STEPS.OFFERS:
				return (
					<>
						<BabyRobotMintProgressBar progress={2} />
						<CloseControl onClick={handleRedirectToMain} />
					</>
				);
			default:
				return null;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [step]);

	return <>{currentStep}</>;
};

export default memo(BabyRobotMint);
