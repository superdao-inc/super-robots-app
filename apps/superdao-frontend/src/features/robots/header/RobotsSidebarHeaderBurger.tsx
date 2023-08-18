import { useRouter } from 'next/router';
import cn from 'classnames';
import { shrinkSmallWallet } from '@sd/superdao-shared';
import { Dropdown, LinkingIcon, Loader, NewLabel1, SupportIcon, Title3, UserAvatarStub } from 'src/components';
import { useIsAuthorized, useLogout } from 'src/features/auth/hooks';
import { useCurrentUserQuery } from 'src/gql/user.generated';
import { useSwitch } from 'src/hooks';
import { openExternal } from 'src/utils/urls';
import { RobotsHeaderConnectButton } from './RobotsHeaderConnectButton';
import { HeaderBurger } from './HeaderBurger/HeaderBurger';
import { sidebarLinksConfig } from './constants';
import { NavLogoutIcon } from '../common/navIcons/logoutIcon';
import { NavGiftIcon } from '../common/navIcons/giftIcon';
import { NavRobotsIcon } from '../common/navIcons/robotsIcon';

type Props = {
	isCodeFlowAvailable: boolean;
	remainingCodeActivations: number;
	withoutRedirect?: boolean;
	withDemo?: boolean;
};

export const RobotsSidebarHeaderBurger = ({
	isCodeFlowAvailable,
	remainingCodeActivations,
	withoutRedirect,
	withDemo
}: Props) => {
	const isAuthorized = useIsAuthorized();
	const { data: currentUser, isLoading: isCurrentUserLoading } = useCurrentUserQuery(
		{},
		{ select: (data) => data.currentUser, enabled: isAuthorized }
	);

	const { push, pathname } = useRouter();

	const { mutate: logout } = useLogout('/', pathname === '/robots/[tokenId]' || withoutRedirect);

	const [isDropdownOpen, { off, toggle }] = useSwitch(false);

	const handleRedirectToRobots = () => {
		push('/robots');
	};

	const handleRedirectToInvite = () => {
		push('/invite');
	};

	const handleLogout = () => {
		off();
		logout({});
	};

	const handleRedirectToDemo = () => {
		push('/demo');
	};

	const bindExternalClick = (link: string) => () => {
		if (link.startsWith('/')) {
			push(link);

			return;
		}

		openExternal(link);
	};

	const isCurrentUserDefined = isAuthorized && currentUser?.walletAddress;

	if (isCurrentUserLoading) {
		return (
			<div className="flex h-10 w-5 items-center justify-center">
				<Loader size="sm" />
			</div>
		);
	}

	const options = [
		{
			label: 'My robots',
			onClick: handleRedirectToRobots,
			icon: NavRobotsIcon
		},
		{
			label: 'Invite friends',
			onClick: handleRedirectToInvite,
			icon: NavGiftIcon
		}
	];

	const definedUserMenuOptions = (
		<>
			<div
				className={cn('500:w-[180px] 500:px-4 flex h-[44px] w-[48px] items-center gap-2 rounded-lg px-2 pb-2', {
					'500:w-[200px]': !isCurrentUserDefined
				})}
			>
				<div className="shrink-0 overflow-hidden rounded-full">
					<UserAvatarStub size="32" seed={currentUser?.walletAddress ?? ''} />
				</div>
				<NewLabel1 className="block font-normal">{shrinkSmallWallet(currentUser?.walletAddress ?? '')}</NewLabel1>
			</div>
			<div className="my-1 mx-4 h-[1px] w-[calc(100%-32px)] bg-white/[.06]"></div>
			{options.map((option) => {
				const Icon = option.icon;
				return (
					<div
						key={option.label}
						onClick={option.onClick}
						className={cn(
							'hover-first:opacity-100 active-first:opacity-100 hover-third:opacity-100 active-third:opacity-100 flex w-full cursor-pointer items-center gap-2 p-2 transition-all duration-100 hover:bg-white/[.08] active:bg-white/[.06]'
						)}
					>
						<Icon className="opacity-40 transition-all duration-100" />
						<NewLabel1 className="font-bold">{option.label}</NewLabel1>
						{option.label === 'Invite friends' && isCodeFlowAvailable && (
							<div
								className={cn('flex h-5 w-5 items-center justify-center rounded-full bg-[#00A5CF]', {
									'!w-max !rounded !px-[6px]': remainingCodeActivations >= 10
								})}
							>
								<Title3 className="text-[12px] leading-[19px]">{remainingCodeActivations}</Title3>
							</div>
						)}
					</div>
				);
			})}
		</>
	);

	const undefinedUserMenuOptions = (
		<div className="mb-2 flex flex-wrap items-center justify-center gap-2 px-4">
			{withDemo && (
				<div
					onClick={handleRedirectToDemo}
					className="flex h-10 w-full shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 border-white/[.04] px-4 transition-all duration-100 hover:bg-white/[.04] active:bg-white/[.02]"
				>
					<NewLabel1 className="font-bold">Demo</NewLabel1>
				</div>
			)}
			<RobotsHeaderConnectButton onClick={off} className="!w-full" />
		</div>
	);

	const dropdownContent = (
		<div onClick={off}>
			{isCurrentUserDefined ? definedUserMenuOptions : undefinedUserMenuOptions}
			{sidebarLinksConfig
				.filter((link) => link.link.startsWith('/'))
				.map((link) => {
					const Icon = link.icon;

					return (
						<div
							key={link.text}
							onClick={bindExternalClick(link.link)}
							className={cn(
								'hover-first:opacity-100 active-first:opacity-100 hover-third:opacity-100 active-third:opacity-100 hover-third:translate-x-0.5 active-third:translate-x-0.5 hover-third:-translate-y-0.5 active-third:-translate-y-0.5 flex w-full cursor-pointer items-center gap-2 p-2 transition-all duration-100 hover:bg-white/[.08] active:bg-white/[.06]',
								{
									'first-child:!opacity-100 bg-white/[.08]': pathname === link.link
								}
							)}
						>
							<Icon className="opacity-40 transition-all duration-100" />
							<NewLabel1 className="font-bold">{link.text}</NewLabel1>
						</div>
					);
				})}
			{sidebarLinksConfig
				.filter((link) => !link.link.startsWith('/'))
				.map((link) => {
					const Icon = link.icon;

					return (
						<div
							key={link.text}
							onClick={bindExternalClick(link.link)}
							className={cn(
								'hover-first:opacity-100 active-first:opacity-100 hover-third:opacity-100 active-third:opacity-100 hover-third:translate-x-0.5 active-third:translate-x-0.5 hover-third:-translate-y-0.5 active-third:-translate-y-0.5 flex w-full cursor-pointer items-center gap-2 p-2 transition-all duration-100 hover:bg-white/[.08] active:bg-white/[.06]'
							)}
						>
							<Icon className="opacity-40 transition-all duration-100" />
							<NewLabel1 className="font-bold">{link.text}</NewLabel1>
							<LinkingIcon className="opacity-40 transition-all duration-100" />
						</div>
					);
				})}
			{isCurrentUserDefined && withDemo && (
				<div
					onClick={handleRedirectToDemo}
					className={cn(
						'hover-first:opacity-100 active-first:opacity-100 hover-third:opacity-100 active-third:opacity-100 flex w-full cursor-pointer items-center gap-2 p-2 transition-all duration-100 hover:bg-white/[.08] active:bg-white/[.06]'
					)}
				>
					<SupportIcon className="opacity-40 transition-all duration-100" />
					<NewLabel1 className="font-bold">Demo</NewLabel1>
				</div>
			)}
			{isAuthorized && <div className="my-1 mx-4 h-[1px] w-[calc(100%-32px)] bg-white/[.06]"></div>}
			{isCurrentUserDefined && (
				<div
					onClick={handleLogout}
					className={cn(
						'hover-first:opacity-100 active-first:opacity-100 hover-third:opacity-100 active-third:opacity-100 flex w-full cursor-pointer items-center gap-2 p-2 transition-all duration-100 hover:bg-white/[.08] active:bg-white/[.06]'
					)}
				>
					<NavLogoutIcon className="opacity-40 transition-all duration-100" />
					<NewLabel1 className="font-bold">Log out</NewLabel1>
				</div>
			)}
		</div>
	);

	return (
		<Dropdown
			isOpen={isDropdownOpen}
			onClickOutside={off}
			placement="bottom-end"
			content={dropdownContent}
			contentClassName={cn('pt-4 pb-2 w-[248px] bg-[#22242A] 1440:hidden')}
		>
			<div className="flex h-10 w-5 items-center justify-center">
				<HeaderBurger onClick={toggle} isOpen={isDropdownOpen} />
			</div>
		</Dropdown>
	);
};
