import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ComponentType } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'src/components';
import { useIsAuthorized } from 'src/features/auth/hooks';
import { useCurrentUserQuery } from 'src/gql/user.generated';
import {
	useIsUserEligibleForMintQuery,
	useMintBabyRobotMutation,
	useMintedBabyRobotByCurrentUserQuery,
	useMintedBabyRobotInfoWithImageMetaByWalletQuery,
	useValidateCanMintBabyRobotMutation,
	useWaitlistBabyRobotMutation
} from 'src/gql/babyRobot.generated';
import { useSwitch } from 'src/hooks';
import { UserAlreadyMintedModal } from '../components/UserAlreadyMintedModal';
import { BabyRobotMintResponseStatus, RobotMintAndWaitlistStatus } from 'src/types/types.generated';
import { BabyRobotIsMintingModal } from '../components/BabyRobotIsMintingModal';
import { UserAlreadyWaitlistedModal } from '../components/UserAlreadyWhitelistedModal';
import { AnalyticsTrackEventType } from 'src/services/analytics/types';
import { useAnalytics } from 'src/providers/analyticsProvider';
import { ActionsProps } from 'src/features/babyRobot/mintv2/process/types';
import { useLoginWithRedirectToOwnedRobots } from '../../hooks/useLoginWithRedirectToOwnedRobots';

type Props = {
	isMintTurnedOff: boolean;
	ActionsComponent: ComponentType<ActionsProps>;
	isInviteFlowOn?: boolean;
};

export const BabyRobotMintProcessActionsWrapper = (props: Props) => {
	const { isMintTurnedOff, ActionsComponent, isInviteFlowOn } = props;

	const { t } = useTranslation();
	const { push } = useRouter();
	const queryClient = useQueryClient();

	const analytics = useAnalytics();

	const isAuthorized = useIsAuthorized();

	const { handleAuth } = useLoginWithRedirectToOwnedRobots();

	const { data: isUserEligibleForMintData, isLoading: isUserEligibleForMintDataLoading } =
		useIsUserEligibleForMintQuery({}, { select: (data) => data.isUserEligibleForMint, enabled: isAuthorized });
	const { status: isUserEligible } = isUserEligibleForMintData || { status: false };

	const { data: mintedBabyRobotByCurrentUserData, isLoading: mintedBabyRobotByCurrentUserDataLoading } =
		useMintedBabyRobotByCurrentUserQuery(
			{},
			{ select: (data) => data.mintedBabyRobotByCurrentUser, enabled: isAuthorized }
		);

	const { data } = useCurrentUserQuery();
	const currentUser = data?.currentUser;

	const { mutate: waitlistBabyRobot } = useWaitlistBabyRobotMutation();

	const { mutate: mintBabyRobot } = useMintBabyRobotMutation();
	const { mutate: validateCanMintBabyRobot } = useValidateCanMintBabyRobotMutation();

	const [isChecking, { on: setIsChecking, off: setIsChecked }] = useSwitch(false);
	const [isLoading, { on: setLoading, off: setLoaded }] = useSwitch(false);
	const [isUserAlreadyMintedModalOpen, { on: openUserAlreadyMintedModal, off: closeUserAlreadyMintedModal }] =
		useSwitch(false);

	const [
		isUserAlreadyWaitlistedModalOpen,
		{ on: openUserAlreadyWaitlistedModal, off: closeUserAlreadyWaitlistedModal }
	] = useSwitch(false);

	const handleMint = async () => {
		try {
			if (!currentUser) return;

			setIsChecking();

			analytics.trackCustomAnalyticsEvent(AnalyticsTrackEventType.TARGET_ACTION_MINT);

			validateCanMintBabyRobot(
				{},
				{
					onSuccess: ({ validateCanMintBabyRobot }) => {
						setIsChecked();

						if (validateCanMintBabyRobot.status === BabyRobotMintResponseStatus.EmailMissing) {
							toast.error('You have to verify your email before minting');

							return;
						}

						if (validateCanMintBabyRobot.status === BabyRobotMintResponseStatus.IpExists) {
							toast.error("We can't authorize more robot minting. It seems you have one from another account");

							return;
						}

						if (validateCanMintBabyRobot.status !== BabyRobotMintResponseStatus.Success) {
							if (validateCanMintBabyRobot.status === BabyRobotMintResponseStatus.AlreadyWaitlisted) {
								openUserAlreadyWaitlistedModal();
							} else {
								openUserAlreadyMintedModal();
							}

							return;
						}

						const isWaitlistFlow = !isUserEligible || isMintTurnedOff;

						if (isWaitlistFlow) {
							waitlistBabyRobot(
								{},
								{
									onSuccess: async ({ waitlistBabyRobot }) => {
										if (waitlistBabyRobot.status === BabyRobotMintResponseStatus.AlreadyMinted) {
											setLoaded();

											openUserAlreadyMintedModal();
											return;
										}

										if (waitlistBabyRobot.status === BabyRobotMintResponseStatus.AlreadyWaitlisted) {
											setLoaded();

											openUserAlreadyWaitlistedModal();
											return;
										}

										if (!waitlistBabyRobot.status || waitlistBabyRobot.status === BabyRobotMintResponseStatus.Error) {
											setLoaded();

											toast.error('Error during adding to waitlist');
											return;
										}

										setLoaded();

										toast.success('You have been successfully added to the waitlist');

										await queryClient.refetchQueries('MintedBabyRobotByCurrentUser');
									},
									onError: () => {
										setLoaded();

										toast.error('Error during adding to waitlist');
									}
								}
							);

							return;
						}

						setLoading();

						mintBabyRobot(
							{ interests: [] },
							{
								onSuccess: async ({ mintBabyRobot }) => {
									if (mintBabyRobot.status === BabyRobotMintResponseStatus.AlreadyMinted) {
										setLoaded();

										openUserAlreadyMintedModal();
										return;
									}

									if (mintBabyRobot.status === BabyRobotMintResponseStatus.AlreadyWaitlisted) {
										setLoaded();

										openUserAlreadyWaitlistedModal();
										return;
									}

									if (!mintBabyRobot.status || mintBabyRobot.status === BabyRobotMintResponseStatus.Error) {
										setLoaded();

										toast.error(t('features.babyRobots.errorDuringMintBabyRobot'));
										return;
									}

									await useMintedBabyRobotInfoWithImageMetaByWalletQuery.fetcher({
										walletAddress: (currentUser?.walletAddress ?? '').toLowerCase()
									})();

									await queryClient.refetchQueries('MintedBabyRobotByCurrentUser');

									push({
										pathname: '/success',
										query: { wallet: currentUser.walletAddress }
									});
								},
								onError: () => {
									setLoaded();

									toast.error(t('features.babyRobots.errorDuringMintBabyRobot'));
								}
							}
						);
					},
					onError: () => {
						setIsChecked();

						toast.error(t('features.babyRobots.errorDuringMintBabyRobot'));
					}
				}
			);
		} catch (e) {}
	};

	return (
		<>
			<ActionsComponent
				isInviteFlowOn={isInviteFlowOn}
				isUserEligible={isUserEligible}
				isUserInWaitlist={mintedBabyRobotByCurrentUserData?.status === RobotMintAndWaitlistStatus.InWaitlist}
				isUserMinted={
					!!(
						mintedBabyRobotByCurrentUserData?.status &&
						mintedBabyRobotByCurrentUserData?.status !== RobotMintAndWaitlistStatus.InWaitlist
					)
				}
				handleMint={handleMint}
				handleAuth={handleAuth}
				isLoading={isLoading || isUserEligibleForMintDataLoading || mintedBabyRobotByCurrentUserDataLoading}
				isMintTurnedOff={isMintTurnedOff}
				isChecking={isChecking}
				isAuthorized={isAuthorized}
			/>

			<UserAlreadyMintedModal isOpen={isUserAlreadyMintedModalOpen} onClose={closeUserAlreadyMintedModal} />
			<UserAlreadyWaitlistedModal isOpen={isUserAlreadyWaitlistedModalOpen} onClose={closeUserAlreadyWaitlistedModal} />
			<BabyRobotIsMintingModal isOpen={isLoading} />
		</>
	);
};
