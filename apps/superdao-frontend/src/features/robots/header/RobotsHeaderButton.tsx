import { useRouter } from 'next/router';
import { NewLabel1 } from 'src/components';
import { useIsAuthorized } from 'src/features/auth/hooks';
import { useCurrentUserQuery } from 'src/gql/user.generated';
import { RobotsHeaderConnectButton } from './RobotsHeaderConnectButton';
import { RobotsHeaderUserMenuButton } from './RobotsHeaderUserMenuButton';

type Props = {
	withoutRedirect?: boolean;
	withDemo?: boolean;
	isCodeFlowAvailable: boolean;
	remainingCodeActivations: number;
};

export const RobotsHeaderButton = ({
	withoutRedirect,
	withDemo,
	isCodeFlowAvailable,
	remainingCodeActivations
}: Props) => {
	const { push } = useRouter();

	const isAuthorized = useIsAuthorized();
	const { data: currentUser, isLoading: isCurrentUserLoading } = useCurrentUserQuery(
		{},
		{ select: (data) => data.currentUser }
	);

	const handleRedirectToDemo = () => {
		push('/demo');
	};

	const isCurrentUserDefined = isAuthorized && currentUser?.walletAddress;

	if (isCurrentUserLoading)
		return (
			<div className="flex h-[48px] w-[202px] shrink-0 animate-pulse items-center justify-center rounded-lg bg-white/[.08]"></div>
		);

	return (
		<div className="flex min-w-[202px] items-center gap-2">
			{withDemo && !isCurrentUserDefined && (
				<div
					onClick={handleRedirectToDemo}
					className="flex h-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 border-white/[.04] px-4 transition-all duration-100 hover:bg-white/[.04] active:bg-white/[.02]"
				>
					<NewLabel1 className="font-bold">Demo</NewLabel1>
				</div>
			)}

			{isCurrentUserDefined ? (
				<RobotsHeaderUserMenuButton
					isCodeFlowAvailable={isCodeFlowAvailable}
					remainingCodeActivations={remainingCodeActivations}
					withoutRedirect={withoutRedirect}
					walletAddress={currentUser.walletAddress}
				/>
			) : (
				<RobotsHeaderConnectButton />
			)}

			{withDemo && isCurrentUserDefined && (
				<div
					onClick={handleRedirectToDemo}
					className="flex h-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 border-white/[.04] px-4 transition-all duration-100 hover:bg-white/[.04] active:bg-white/[.02]"
				>
					<NewLabel1 className="font-bold">Demo</NewLabel1>
				</div>
			)}
		</div>
	);
};
