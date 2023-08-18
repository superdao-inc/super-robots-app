import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { shrinkSmallWallet } from '@sd/superdao-shared';
import { NewBody, NewLabel1, NewTitle1, NewTitle2, OkIcon, UserAvatarStub, toast } from 'src/components';
import { GradientButton } from 'src/features/auth/components/gradientButton';
import { useAuthModal } from 'src/features/auth/context/authModalContext';
import { RobotsFooter } from '../footer/RobotsFooter';
import { useWaitlistBabyRobotMutation } from 'src/gql/babyRobot.generated';
import { BabyRobotMintResponseStatus, RobotMintAndWaitlistStatus } from 'src/types/types.generated';
import { Arrow } from 'src/components/assets/icons/arrow';

type Props = {
	codeOwner: string;
	isAuthorized: boolean;
	status?: RobotMintAndWaitlistStatus;
};

export const ActiveInvitationsNoRemaining = ({ codeOwner, isAuthorized, status }: Props) => {
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

				<div className="744:mt-8 mx-auto mt-10 flex items-center justify-center gap-[10px]">
					<NewLabel1 className="font-normal text-white/[.7]">Invited by</NewLabel1>
					<div className="shrink-0 overflow-hidden rounded-full">
						<UserAvatarStub size="32" seed={codeOwner} />
					</div>
					<NewLabel1 className="block font-normal text-white/[.7]">{shrinkSmallWallet(codeOwner)}</NewLabel1>
				</div>

				<NewTitle1 className="text-8 744:max-w-max 744:text-[56px] 744:leading-[64px] mx-auto mt-4 max-w-[280px] text-center leading-10">
					All invites are claimed
				</NewTitle1>

				<NewTitle2 className="744:text-2xl 744:max-w-max mx-auto mt-6 max-w-[280px] text-center">
					Ask for invites on Twitter, or sign up for the waitlist
				</NewTitle2>

				{statusContent}
			</div>

			<div className="w-screen">
				<RobotsFooter />
			</div>
		</div>
	);
};
