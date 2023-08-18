import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import cn from 'classnames';

import {
	Cell,
	ChevronIcon,
	Dropdown,
	EditIcon,
	GiftIcon,
	LogoutIcon,
	MemberFilledIcon,
	MemberIcon,
	QuestionIcon,
	SubHeading,
	Title2
} from 'src/components';
import { NavigationItem } from 'src/features/topMenu/navigationItem';
import { colors } from 'src/style/variables';

import { NAVIGATION_ITEMS } from './navigationSettings';

import { AuthAPI, AuthUI } from '../auth';
import { useCurrentUserQuery } from '../user/hooks';
import { GiftActiveInsideIcon } from 'src/components/assets/icons/giftActiveInsideIcon';
import { useSwitch } from 'src/hooks';
import { openExternal } from 'src/utils/urls';
import { EditFillIcon } from 'src/components/assets/icons/editFill';

const DESKTOP_BREAKPOINT = 800;

export const Navigation = () => {
	const { t } = useTranslation();
	const { pathname, push } = useRouter();

	const { data: currentUserData } = useCurrentUserQuery();
	const { currentUser } = currentUserData || {};
	const { mutate: logout } = AuthAPI.useLogout();
	const isAuthorized = AuthAPI.useIsAuthorized();

	const { openAuthModal } = AuthUI.useAuthModal();
	const [activeMenuSection, setActiveMenuSection] = useState<string>(t('pages.offersList.title'));
	const [isDropdownOpen, { off, toggle }] = useSwitch(false);
	const [isDropdownHidden, setIsDropdownHidden] = useState(window?.innerWidth > DESKTOP_BREAKPOINT);

	useEffect(() => {
		if (pathname === '/u/[userslug]/edit') setActiveMenuSection(t('components.user.actions.edit'));
		if (pathname === '/u/[userslug]') setActiveMenuSection(t('components.user.profile'));
		if (pathname === '/') setActiveMenuSection(t('pages.offersList.title'));
	}, [pathname, t]);

	useEffect(() => {
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const isMenuSectionActive = useCallback(
		(section: 'REWARDS' | 'PROFILE' | 'PROFILE_EDIT') => {
			const mapping = {
				REWARDS: 'pages.offersList.title',
				PROFILE: 'components.user.profile',
				PROFILE_EDIT: 'components.user.actions.edit'
			};

			return activeMenuSection === t(mapping[section]);
		},
		[activeMenuSection, t]
	);

	const handleResize = () => {
		setIsDropdownHidden(window.innerWidth > DESKTOP_BREAKPOINT);
	};

	const handleLoginClick = useCallback(() => {
		openAuthModal();
		off();
	}, [off, openAuthModal]);
	const handleLogout = (e: MouseEvent<HTMLElement>) => {
		e.stopPropagation();
		logout({});
		off();
	};
	const handleEdit = () => {
		push(`/u/${currentUser?.slug}/edit`);
		off();
	};
	const handleOpenProfile = () => {
		push(`/u/${currentUser?.slug}`);
		off();
	};
	const handleOpenRewards = () => {
		push(`/`);
		off();
	};
	const handleOpenSupport = () => openExternal('https://t.me/superdao_co');

	const commonOptions = [
		{
			label: t('pages.offersList.title'),
			before: isMenuSectionActive('REWARDS') ? (
				<GiftActiveInsideIcon width={20} height={20} />
			) : (
				<GiftIcon width={20} height={20} />
			),
			onClick: handleOpenRewards,
			color: isMenuSectionActive('REWARDS') ? colors.accentPrimary : undefined,
			size: 'xs'
		}
	];

	const loggedInOptions = [
		{
			label: t('components.user.profile'),
			before: isMenuSectionActive('PROFILE') ? (
				<MemberFilledIcon width={20} height={20} fill="#FC7900" />
			) : (
				<MemberIcon width={20} height={20} />
			),
			onClick: handleOpenProfile,
			color: isMenuSectionActive('PROFILE') ? colors.accentPrimary : undefined,
			size: 'xs'
		},
		{
			label: t('components.user.actions.edit'),
			before: isMenuSectionActive('PROFILE_EDIT') ? (
				<EditFillIcon width={20} height={20} fill="#FC7900" />
			) : (
				<EditIcon width={20} height={20} />
			),
			onClick: handleEdit,
			color: isMenuSectionActive('PROFILE_EDIT') ? colors.accentPrimary : undefined,
			size: 'xs'
		},
		{
			label: t('components.user.actions.help'),
			before: <QuestionIcon width={20} height={20} />,
			onClick: handleOpenSupport,
			size: 'xs'
		},
		{
			label: t('components.user.actions.logout'),
			before: <LogoutIcon width={20} height={20} fill={colors.accentNegative} />,
			onClick: handleLogout,
			color: colors.accentNegative,
			size: 'xs'
		}
	];

	const anonymousOptions = [
		{
			label: t('components.user.profile'),
			before: <MemberIcon width={20} height={20} />,
			onClick: handleLoginClick,
			size: 'xs'
		},
		{
			label: t('components.user.actions.help'),
			before: <QuestionIcon width={20} height={20} />,
			onClick: handleOpenSupport,
			size: 'xs'
		}
	];

	const targetOptions = isAuthorized ? loggedInOptions : anonymousOptions;

	const options = [...commonOptions, ...targetOptions];

	return (
		<>
			<div className="hidden gap-x-1 md:flex">
				{NAVIGATION_ITEMS.map((item, i) => {
					const isActive = item.url === pathname;

					return <NavigationItem {...item} isActive={isActive} key={i} />;
				})}
			</div>
			<div className="block md:hidden">
				<Dropdown
					isOpen={!isDropdownHidden && isDropdownOpen}
					onClickOutside={off}
					placement="bottom"
					modifiers={[
						{
							name: 'preventOverflow',
							options: {
								altAxis: true,
								padding: 16
							}
						}
					]}
					className="h-7"
					contentClassName="w-[calc(100vw-32px)]"
					content={
						<>
							{options.map((option) => (
								<Cell
									className="hover:bg-backgroundTertiaryHover transition-all"
									key={option.label}
									{...option}
									size={'xs'}
									label={
										<SubHeading className="w-[264px] max-w-[calc(100vw-100px)]" color={(option as any)?.color}>
											{/* width above is for according to design (width is base size, calculation is screen size - cell and dropdown paddings and icons) */}
											{option.label}
										</SubHeading>
									}
									onClick={option.onClick}
								/>
							))}
						</>
					}
				>
					<div className="flex cursor-pointer items-center gap-2" onClick={toggle}>
						<Title2>{activeMenuSection}</Title2>
						<ChevronIcon
							width={16}
							height={16}
							className={cn('rotate-90 transition-all', { '-rotate-90': isDropdownOpen })}
						/>
					</div>
				</Dropdown>
			</div>
		</>
	);
};
