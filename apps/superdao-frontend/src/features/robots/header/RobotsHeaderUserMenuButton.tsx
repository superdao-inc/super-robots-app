import { useRouter } from 'next/router';
import { Placement } from '@popperjs/core';
import cn from 'classnames';
import { shrinkSmallWallet } from '@sd/superdao-shared';
import { Dropdown, NewLabel1, Title3, UserAvatarStub } from 'src/components';
import { useLogout } from 'src/features/auth/hooks';
import { useSwitch } from 'src/hooks';
import { NavLogoutIcon } from '../common/navIcons/logoutIcon';
import { NavRobotsIcon } from '../common/navIcons/robotsIcon';
import { NavGiftIcon } from '../common/navIcons/giftIcon';

type Props = {
	position?: Placement;
	walletAddress: string;
	onLogout?: () => void;
	className?: string;
	contentClassName?: string;
	onlyLogout?: boolean;
	withoutRedirect?: boolean;
	isCodeFlowAvailable: boolean;
	remainingCodeActivations: number;
};

export const RobotsHeaderUserMenuButton = (props: Props) => {
	const {
		position,
		walletAddress,
		onLogout,
		className,
		contentClassName,
		onlyLogout,
		withoutRedirect,
		isCodeFlowAvailable,
		remainingCodeActivations
	} = props;

	const { push, pathname } = useRouter();

	const { mutate: logout } = useLogout('/', pathname === '/robots/[tokenId]' || withoutRedirect);

	const [isDropdownOpen, { off, toggle }] = useSwitch(false);

	const handleRedirectToRobots = () => {
		push('/robots');
	};

	const handleLogout = () => {
		logout({});
		onLogout?.();
	};

	const handleRedirectToInvite = () => {
		push('/invite');
	};

	const options: any[] = [
		{
			label: 'Log out',
			onClick: handleLogout,
			icon: NavLogoutIcon
		}
	];

	const addonOptions = [
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

	return (
		<Dropdown
			isOpen={isDropdownOpen}
			onClickOutside={off}
			placement={position || 'bottom-start'}
			contentClassName={cn('960:block hidden bg-[#22242A] w-[263px]', contentClassName)}
			content={
				<>
					{!onlyLogout && (
						<>
							{addonOptions.map((option) => {
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
							<div className="my-1 mx-4 h-[1px] w-[calc(100%-32px)] bg-white/[.06]"></div>
						</>
					)}
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
			}
		>
			<div
				className={cn(
					'500:w-[180px] 500:px-4 flex h-[48px] w-[48px] cursor-pointer items-center gap-2 rounded-lg px-2 py-2 transition-all hover:bg-white/[.04] active:bg-white/[.08]',
					className
				)}
				onClick={toggle}
			>
				<div className="shrink-0">
					<UserAvatarStub size="32" seed={walletAddress} />
				</div>
				<NewLabel1 className="500:block hidden font-normal">{shrinkSmallWallet(walletAddress)}</NewLabel1>
			</div>
		</Dropdown>
	);
};
