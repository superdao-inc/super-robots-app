import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useIsAuthorized } from 'src/features/auth/hooks';
import { useMintBabyRobotMutation, useWalletScoringDataQuery } from 'src/gql/babyRobot.generated';
import { useCurrentUserQuery } from 'src/gql/user.generated';
import { useSwitch } from 'src/hooks';
import { RobotPreview } from '../../types';
import { UserAlreadyMintedModal } from '../UserAlreadyMintedModal';
import { BabyRobotMintInterestsProcess } from './BabyRobotMintInterestsProcess';

export const BabyRobotMint = () => {
	const { t } = useTranslation();
	const { push } = useRouter();

	const isAuthorized = useIsAuthorized();

	const { mutate: mintBabyRobot } = useMintBabyRobotMutation();

	const { data } = useCurrentUserQuery();
	const { currentUser } = data || {};
	const { walletAddress } = currentUser || {};

	const { data: walletScoringDataQueryResponse, isLoading: isWalletScoringDataQueryResponseLoading } =
		useWalletScoringDataQuery({ walletAddress: walletAddress! }, { enabled: !!walletAddress });
	const { walletScoringData } = walletScoringDataQueryResponse || {};

	const [, setInterests] = useState<string[]>([]);

	const [_result, setResult] = useState<RobotPreview | undefined>();
	const [randomRobots, setRandomRobots] = useState<string[]>([]);
	const [isLoading, { on: setLoading, off: setLoaded }] = useSwitch(false);
	const [isLoadingRandom, { on: setLoadingRandom, off: setLoadedRandom }] = useSwitch(false);

	const [isUserAlreadyMintedModalOpen, { on: openUserAlreadyMintedModal, off: closeUserAlreadyMintedModal }] =
		useSwitch(false);

	const onSubmit = async (interests: string[] | ['random']) => {
		try {
			if (interests[0] === 'random') {
				setLoadingRandom();
				const response = await fetch('/api/babyRobots/preview/random/batch', {
					method: 'GET'
				});

				const images = await response.json();

				setRandomRobots(images);

				setLoaded();
				setLoadedRandom();

				return;
			}

			setLoading();

			mintBabyRobot(
				{ interests },
				{
					onSuccess: ({ mintBabyRobot }) => {
						setLoaded();
						setLoadedRandom();

						if (mintBabyRobot.status === 'ALREADY_MINTED') {
							openUserAlreadyMintedModal();
							return;
						}

						if (mintBabyRobot.status === 'ERROR') {
							toast.error(t('features.babyRobots.errorDuringMintBabyRobot'));
							return;
						}

						push({
							pathname: '/success',
							query: { wallet: walletAddress }
						});
					},
					onError: () => {
						setLoaded();
						setLoadedRandom();

						toast.error(t('features.babyRobots.errorDuringMintBabyRobot'));
					}
				}
			);
		} catch (e) {}
	};

	return (
		<>
			<BabyRobotMintInterestsProcess
				isAuthorized={isAuthorized}
				onSubmit={(interests: string[]) => {
					setInterests(interests);
					onSubmit(interests);
				}}
				robotData={walletScoringData as any}
				wallet={walletAddress}
				resetResult={() => {
					setResult(undefined);
				}}
				isLoading={isLoading}
				isRobotDataLoading={isWalletScoringDataQueryResponseLoading}
				isLoadingRandom={isLoadingRandom}
				randomRobots={randomRobots}
				onCloseRobotsModal={() => setRandomRobots([])}
			/>
			<UserAlreadyMintedModal isOpen={isUserAlreadyMintedModalOpen} onClose={closeUserAlreadyMintedModal} />
		</>
	);
};
