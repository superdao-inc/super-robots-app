import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { Body, NewBody, NewLabel1, NewTitle1, OkIcon, toast } from 'src/components';
import { GradientButton } from 'src/features/auth/components/gradientButton';
import { useAuthModal } from 'src/features/auth/context/authModalContext';
import { RobotsFooter } from '../footer/RobotsFooter';
import { BabyRobotMintResponseStatus, RobotMintAndWaitlistStatus } from 'src/types/types.generated';
import { useWaitlistBabyRobotMutation } from 'src/gql/babyRobot.generated';
import { Arrow } from 'src/components/assets/icons/arrow';

type Props = {
	isAuthorized: boolean;
	status?: RobotMintAndWaitlistStatus;
};

export const ActiveInvitationsNotAvailableForUser = ({ isAuthorized, status }: Props) => {
	const queryClient = useQueryClient();
	const { push } = useRouter();

	const { openAuthModal: handleAuth } = useAuthModal();

	const { mutate: waitlistBabyRobot } = useWaitlistBabyRobotMutation();

	const handleJoinWaitlist = () => {
		waitlistBabyRobot(
			{},
			{
				onSuccess: async ({ waitlistBabyRobot }) => {
					if (waitlistBabyRobot.status === BabyRobotMintResponseStatus.AlreadyMinted) {
						toast.error('You already have Robot');
						return;
					}

					if (waitlistBabyRobot.status === BabyRobotMintResponseStatus.AlreadyWaitlisted) {
						toast.error('You are already in waitlist');
						return;
					}

					if (!waitlistBabyRobot.status || waitlistBabyRobot.status === BabyRobotMintResponseStatus.Error) {
						toast.error('Error during adding to waitlist');
						return;
					}

					toast.success('You have been successfully added to the waitlist');

					await queryClient.refetchQueries('MintedBabyRobotByCurrentUser');
				},
				onError: () => {
					toast.error('Error during adding to waitlist');
				}
			}
		);
	};

	const handleRedirectToRobots = () => {
		push('/robots');
	};

	const statusContent =
		status === 'IN_WAITLIST' ? (
			<div className="744:px-0 my-10 w-full px-6">
				<div className="mx-auto flex max-w-max items-center gap-3 rounded-lg bg-white/[.08] px-4 py-3">
					<div className="shrink-0">
						<OkIcon />
					</div>
					<div>
						<NewBody className="max-w-max font-bold leading-5">You&apos;re waitlisted for getting your Robot</NewBody>
					</div>
				</div>
			</div>
		) : !!status && status !== 'CLAIMED' ? (
			<div className="744:px-0 my-10 w-full px-6">
				<div className="mx-auto flex max-w-max items-center gap-3 rounded-lg bg-white/[.08] px-4 py-3">
					<div className="shrink-0">
						<OkIcon />
					</div>
					<div>
						<NewBody className="max-w-max font-bold leading-5">Generating your Robot. May take a while</NewBody>
					</div>
				</div>
				<GradientButton onClick={handleRedirectToRobots} className="mx-auto mt-10 max-w-max !rounded-lg">
					<>
						<NewLabel1 className="shrink-0 font-bold">Open app</NewLabel1>
						<Arrow />
					</>
				</GradientButton>
			</div>
		) : !!status ? (
			<GradientButton onClick={handleRedirectToRobots} className="my-10 mx-auto max-w-max !rounded-lg">
				<>
					<NewLabel1 className="shrink-0 font-bold">Go to owner app</NewLabel1>
					<Arrow />
				</>
			</GradientButton>
		) : (
			<GradientButton
				className="mx-auto my-10 !w-max !rounded-lg"
				onClick={isAuthorized ? handleJoinWaitlist : handleAuth}
			>
				<NewLabel1 className="font-bold">Join waitlist</NewLabel1>
			</GradientButton>
		);

	return (
		<div className="744:pt-[80px] mx-auto flex h-[calc(100vh-56px)] flex-col justify-between pt-10">
			<div>
				<div className="744:w-[300px] 744:h-[300px] mx-auto h-[280px] w-[280px]">
					<img src="/robot-invite-not-available.png" className="h-full w-full object-cover" />
				</div>

				<NewTitle1 className="text-8 744:max-w-[664px] 1440:max-w-[950px] 744:text-[56px] 744:leading-[64px] mx-auto mt-4 max-w-[280px] text-center leading-10">
					You already claimed your Robot
				</NewTitle1>

				<Body className="744:text-2xl 744:max-w-[664px] 1440:max-w-[980px] mx-auto mt-6 max-w-[280px] text-center text-[16px]">
					Minting through invite links is only available if you haven&apos;t claimed Robot yet
				</Body>

				{statusContent}
			</div>

			<div className="w-screen">
				<RobotsFooter />
			</div>
		</div>
	);
};
