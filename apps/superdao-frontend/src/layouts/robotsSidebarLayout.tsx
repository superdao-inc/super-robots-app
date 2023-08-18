import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { shouldRedirectToMobileStub } from 'src/utils/shouldRedirectToMobileStub';
import { WithChildren } from 'src/types/type.utils';
import { VerifyEmailModal } from 'src/features/auth/components/verifyEmailModal';
import { useCurrentUserQuery } from 'src/gql/user.generated';
import { NavRobotsIcon } from 'src/features/robots/common/navIcons/robotsIcon';
import { LinkingIcon, NewLabel1, SupportIcon, Title3 } from 'src/components';
import { NavGiftIcon } from 'src/features/robots/common/navIcons/giftIcon';
import { openExternal } from 'src/utils/urls';
import { RobotsHeaderUserMenuButton } from 'src/features/robots/header/RobotsHeaderUserMenuButton';
import { RobotsSidebarHeader } from 'src/features/robots/header/RobotsSidebarHeader';
import { sidebarLinksConfig } from 'src/features/robots/header/constants';
import { useIsAuthorized } from 'src/features/auth/hooks';
import { useAuthModal } from 'src/features/auth/context/authModalContext';
import { useGetCodeInvitationsInfoQuery } from 'src/gql/userCodes.generated';

type Props = WithChildren<{}>;

export const RobotsSidebarLayout = (props: Props) => {
	const { children } = props;

	const {
		props: { nextAttemptToSendEmail }
	} = children;

	const { push, asPath, pathname } = useRouter();

	const { data: getCodeInvitationsInfo } = useGetCodeInvitationsInfoQuery(
		{},
		{ select: (data) => data.getCodeInvitationsInfo }
	);
	const { isCodeFlowAvailable, remainingCodeActivations } = getCodeInvitationsInfo ?? {
		isCodeFlowAvailable: false,
		remainingCodeActivations: 0
	};

	const { openAuthModal } = useAuthModal();

	const isAuthorized = useIsAuthorized();

	const { data } = useCurrentUserQuery();

	const currentUser = data?.currentUser;
	const needVerifyEmail = currentUser?.id && !currentUser.emailVerified;

	useEffect(() => {
		if (shouldRedirectToMobileStub(pathname)) {
			void push(`/mobile?from=${asPath}`);
		}
	}, [asPath, pathname, push]);

	const handleRedirectToMint = () => {
		if (pathname === '/') {
			location.reload();
			return;
		}

		push('/');
	};

	const handleRedirectToRobots = () => {
		push('/robots');
	};

	const handleRedirectToInvite = () => {
		push('/invite');
	};

	const bindExternalClick = (link: string) => () => {
		if (link.startsWith('/')) {
			push(link);

			return;
		}

		openExternal(link);
	};

	const handleAuth = () => {
		openAuthModal();
	};

	const handleRedirectToDemo = () => {
		push('/demo');
	};

	const isRobotsPage = pathname.startsWith('/robots');
	const isInvitePage = pathname === '/invite';

	return (
		<>
			<div className="1440:hidden block">
				<RobotsSidebarHeader
					isCodeFlowAvailable={isCodeFlowAvailable}
					remainingCodeActivations={remainingCodeActivations}
				/>
			</div>

			<div className="relative flex h-full w-full">
				<div className="1440:w-[280px] relative h-full min-h-max w-0 shrink-0 overflow-hidden">
					<div className="1440:w-[280px] 1440:overflow-auto 1440:p-4 1440:pb-[80px] fixed top-0 left-0 h-full w-0 overflow-hidden border-r border-white/[.06]">
						<img
							className="mt-2 ml-2 cursor-pointer"
							onClick={handleRedirectToMint}
							src="/robot-logo.png"
							width={185}
							height={24}
						/>

						<div className="mt-6 flex flex-wrap gap-1">
							{isAuthorized && (
								<>
									<div
										onClick={handleRedirectToRobots}
										className={cn(
											'hover-first:opacity-100 active-first:opacity-100 flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 transition-all duration-100 hover:bg-white/[.08] active:bg-white/[.06]',
											{ 'bg-white/[.04]': isRobotsPage }
										)}
									>
										<NavRobotsIcon
											className={cn('opacity-40 transition-all duration-100', { 'opacity-100': isRobotsPage })}
										/>
										<NewLabel1 className="font-bold">My Robots</NewLabel1>
									</div>
									<div
										onClick={handleRedirectToInvite}
										className={cn(
											'hover-first:opacity-100 active-first:opacity-100 flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 transition-all duration-100 hover:bg-white/[.08] active:bg-white/[.06]',
											{ 'bg-white/[.04]': isInvitePage }
										)}
									>
										<NavGiftIcon
											className={cn('opacity-40 transition-all duration-100', { 'opacity-100': isInvitePage })}
										/>
										<NewLabel1 className="font-bold">Invite friends</NewLabel1>
										{isCodeFlowAvailable && (
											<div
												className={cn('flex h-5 w-5 items-center justify-center rounded-full bg-[#00A5CF]', {
													'!w-max !rounded !px-[6px]': remainingCodeActivations >= 10
												})}
											>
												<Title3 className="text-[12px] leading-[19px]">{remainingCodeActivations}</Title3>
											</div>
										)}
									</div>
								</>
							)}

							{sidebarLinksConfig.map((link) => {
								const Icon = link.icon;

								return (
									<div
										key={link.text}
										onClick={bindExternalClick(link.link)}
										className={cn(
											'hover-first:opacity-100 active-first:opacity-100 hover-third:opacity-100 active-third:opacity-100 hover-third:translate-x-0.5 active-third:translate-x-0.5 hover-third:-translate-y-0.5 active-third:-translate-y-0.5 flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 transition-all duration-100 hover:bg-white/[.08] active:bg-white/[.06]'
										)}
									>
										<Icon className="opacity-40 transition-all duration-100" />
										<NewLabel1 className="font-bold">{link.text}</NewLabel1>
										{!link.link.startsWith('/') && <LinkingIcon className="opacity-40 transition-all duration-100" />}
									</div>
								);
							})}
							<div
								onClick={handleRedirectToDemo}
								className={cn(
									'hover-first:opacity-100 active-first:opacity-100 hover-third:opacity-100 active-third:opacity-100 hover-third:translate-x-0.5 active-third:translate-x-0.5 hover-third:-translate-y-0.5 active-third:-translate-y-0.5 flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 transition-all duration-100 hover:bg-white/[.08] active:bg-white/[.06]'
								)}
							>
								<SupportIcon className="opacity-40 transition-all duration-100" />
								<NewLabel1 className="font-bold">Demo</NewLabel1>
							</div>
						</div>

						<div className="1440:w-[280px] 1440:overflow-auto fixed bottom-0 left-0 w-0 overflow-hidden border-r border-white/[.06] bg-[#191B21]">
							<div className="my-4 mx-6">
								{!!currentUser?.walletAddress ? (
									<RobotsHeaderUserMenuButton
										isCodeFlowAvailable={isCodeFlowAvailable}
										remainingCodeActivations={remainingCodeActivations}
										onlyLogout
										contentClassName="!w-[calc(280px-24px-24px)] bg-[#22242A]"
										className="!w-full"
										position="top-start"
										walletAddress={currentUser.walletAddress}
									/>
								) : (
									<div
										onClick={handleAuth}
										className="flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-white/[.08] transition-all duration-100 hover:bg-white/[.06] active:bg-white/[.04]"
									>
										<Title3 className="text-[16px]">Open app</Title3>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				{children}
			</div>

			{needVerifyEmail && <VerifyEmailModal withClose={true} nextAttemptToSendEmail={nextAttemptToSendEmail} />}
		</>
	);
};

export const getRobotsSidebarLayout = (page: ReactElement) => (
	<RobotsSidebarLayout {...page.props}>{page}</RobotsSidebarLayout>
);
