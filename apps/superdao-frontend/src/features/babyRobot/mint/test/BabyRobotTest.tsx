import { useState } from 'react';
import { BabyRobotMintInterestsTest } from 'src/features/babyRobot/mint/test/BabyRobotMintInterestsTest';
import { useSwitch } from 'src/hooks';
import { RobotPreview } from '../../types';

export const BabyRobotTest = () => {
	const [, setInterests] = useState<string[]>([]);
	const [wallet, setWallet] = useState<string | undefined>();

	const [result, setResult] = useState<RobotPreview | undefined>();
	const [randomRobots, setRandomRobots] = useState<string[]>([]);
	// const [isLoading, { on: setLoading, off: setLoaded }] = useSwitch(false);
	const [isLoadingRandom, { on: setLoadingRandom, off: setLoadedRandom }] = useSwitch(false);

	const onSubmit = async (interests: string[] | ['random']) => {
		try {
			if (interests[0] === 'random') {
				setLoadingRandom();
				const response = await fetch('/api/babyRobots/preview/random/batch', {
					method: 'GET'
				});

				const images = await response.json();

				setRandomRobots(images);

				return;
			}

			// setLoading();

			// const result = await fetch('/api/babyRobots/preview', {
			// 	method: 'POST',
			// 	body: JSON.stringify({
			// 		walletOrEns: wallet?.toLowerCase().trim(),
			// 		interests: interests
			// 	}),
			// 	headers: {
			// 		'content-type': 'application/json'
			// 	}
			// });

			// const parsed = await result.json();

			// setResult(parsed);
		} finally {
			// setLoaded();
			setLoadedRandom();
		}
	};

	return (
		<>
			<BabyRobotMintInterestsTest
				onSubmit={(interests: string[]) => {
					setInterests(interests);
					onSubmit(interests);
				}}
				robotData={result}
				wallet={wallet}
				setWallet={setWallet}
				resetResult={() => {
					setResult(undefined);
					setWallet(undefined);
				}}
				isLoading={
					false // isLoading
				}
				isLoadingRandom={isLoadingRandom}
				randomRobots={randomRobots}
				onCloseRobotsModal={() => setRandomRobots([])}
			/>
		</>
	);
};
