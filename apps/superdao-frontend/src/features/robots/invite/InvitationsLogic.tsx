import { useState } from 'react';
import { useIsAuthorized } from 'src/features/auth/hooks';
import { useMintedBabyRobotByCurrentUserQuery } from 'src/gql/babyRobot.generated';
import { ActiveInvitations } from './ActiveInvitations';
import { ActiveInvitationsNoRemaining } from './ActiveInvitationsNoRemaining';
import { useCurrentUserQuery } from 'src/gql/user.generated';
import { Loader } from 'src/components';
import { ActiveInvitationsNotAvailableForUser } from './ActiveInvitationsNotAvailableForUser';
import { VerifyEmailModal } from 'src/features/auth/components/verifyEmailModal';

type Props = {
	codeOwner: string;
	remainingCodeActivations: number;
	nextAttemptToSendEmail: number | undefined;
};

export const InvitationsLogic = ({ codeOwner, remainingCodeActivations, nextAttemptToSendEmail }: Props) => {
	const isAuthorized = useIsAuthorized();

	const [isMinting, setIsMinting] = useState(false);

	const { data: currentUser, isLoading: isCurrentUserLoading } = useCurrentUserQuery(
		{},
		{ select: (data) => data.currentUser, enabled: isAuthorized }
	);
	const { walletAddress } = currentUser ?? {};

	const { data: mintedBabyRobotByCurrentUser, isLoading: isCurrentUserMintDataLoading } =
		useMintedBabyRobotByCurrentUserQuery(
			{},
			{ select: (data) => data.mintedBabyRobotByCurrentUser, enabled: isAuthorized }
		);
	const { status } = mintedBabyRobotByCurrentUser ?? {};

	const handleMint = () => {
		setIsMinting(true);
	};

	const isLoading = isCurrentUserLoading || isCurrentUserMintDataLoading;

	const needVerifyEmail = currentUser?.id && !currentUser.emailVerified;

	let content = <></>;

	if (isLoading) {
		content = (
			<div className="flex h-[calc(100vh-56px)] w-full items-center justify-center">
				<Loader size="lg" />
			</div>
		);
	} else if (!remainingCodeActivations && !isMinting) {
		content = <ActiveInvitationsNoRemaining isAuthorized={isAuthorized} codeOwner={codeOwner} status={status} />;
	} else if (((status && status !== 'IN_WAITLIST') || codeOwner === walletAddress) && !isMinting) {
		content = <ActiveInvitationsNotAvailableForUser isAuthorized={isAuthorized} status={status} />;
	} else {
		// here we need modal on next level
		return (
			<ActiveInvitations
				nextAttemptToSendEmail={nextAttemptToSendEmail}
				onMint={handleMint}
				isAuthorized={isAuthorized}
				codeOwner={codeOwner}
			/>
		);
	}

	return (
		<>
			{content}
			{needVerifyEmail && <VerifyEmailModal withClose nextAttemptToSendEmail={nextAttemptToSendEmail} />}
		</>
	);
};
