import { useTranslation } from 'next-i18next';
import { MouseEvent, useEffect, useState } from 'react';
import { FC, useCallback } from 'react';
import { getOptimizedFileUrl } from 'src/utils/upload';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { shrinkWallet } from '@sd/superdao-shared';
import {
	Button,
	DropdownMenu,
	EditIcon,
	Label2,
	Loader,
	LoginIcon,
	LogoutIcon,
	QuestionIcon,
	UserAvatar
} from 'src/components';
import { AuthAPI, AuthUI } from '../auth';
import { useCurrentUserQuery } from '../user/hooks';
import { ChevronUp } from 'src/components/assets/icons/chevron-up';
import { colors } from 'src/style';
import { openExternal } from 'src/utils/urls';

const MenuButton = (props: any) => {
	const { isProfilePathname, onClick } = props;
	const handleClick = (e: MouseEvent<HTMLElement>) => {
		e.stopPropagation();
		onClick(e);
	};
	return (
		<Button
			{...props}
			onClick={handleClick}
			size="lg"
			color={isProfilePathname ? 'overlayOrange' : 'overlaySecondary'}
			className="h-[40px] rounded-l-none px-3 transition-all"
			label={
				<ChevronUp
					fill={isProfilePathname ? '#FC7900' : '#A2A8B4'}
					className={cn('rotate-180 transition-all', { 'rotate-0': props.isOpen })}
				/>
			}
		/>
	);
};

type Props = {
	noTransform?: boolean;
	className?: string;
};

export const AuthButton: FC<Props> = (props) => {
	const { noTransform, className } = props;

	const { t } = useTranslation();
	const { push, pathname } = useRouter();

	const [isProfilePathname, setIsProfilePathname] = useState(false);

	useEffect(() => {
		setIsProfilePathname(pathname === '/u/[userslug]');
	}, [pathname]);

	const { openAuthModal } = AuthUI.useAuthModal();
	const { mutate: logout } = AuthAPI.useLogout();

	const { data: currentUserData, isLoading } = useCurrentUserQuery();
	const { currentUser } = currentUserData || {};

	const isAuthorized = Boolean(currentUser?.id);

	const handleLoginClick = useCallback(() => openAuthModal(), [openAuthModal]);
	const handleLogout = (e: MouseEvent<HTMLElement>) => {
		e.stopPropagation();
		logout({});
	};
	const handleEdit = () => push(`/u/${currentUser?.slug}/edit`);
	const handleOpenProfile = () => push(`/u/${currentUser?.slug}`);

	if (isLoading) return <Loader size="md" />;

	return isAuthorized ? (
		<div className="hidden flex-row md:flex">
			<Button
				size="lg"
				color={isProfilePathname ? 'overlayOrange' : 'overlaySecondary'}
				className="gap-3 rounded-r-none pl-3 pr-2 transition-all"
				onClick={handleOpenProfile}
			>
				<UserAvatar
					size="xs"
					seed={currentUser?.id}
					src={currentUser?.avatar ? getOptimizedFileUrl(currentUser?.avatar) : undefined}
				/>
				<Label2
					className={cn('w-full max-w-[110px] truncate transition-all', isProfilePathname && 'text-accentPrimary')}
				>
					{currentUser?.displayName || shrinkWallet(currentUser?.ens || currentUser?.walletAddress || '')}
				</Label2>
			</Button>
			<DropdownMenu
				contentClassName="w-[190px]"
				options={[
					{
						label: t('components.user.actions.edit'),
						before: <EditIcon width={20} height={20} />,
						onClick: handleEdit,
						size: 'xs'
					},
					{
						label: t('components.user.actions.help'),
						before: <QuestionIcon width={20} height={20} />,
						onClick: () => openExternal('https://t.me/superdao_co'),
						size: 'xs'
					},
					{
						label: t('components.user.actions.logout'),
						before: <LogoutIcon width={20} height={20} fill={colors.accentNegative} />,
						onClick: handleLogout,
						color: colors.accentNegative,
						size: 'xs'
					}
				]}
				control={<MenuButton isProfilePathname={isProfilePathname} />}
			/>
		</div>
	) : (
		<div>
			<Button
				size="lg"
				className={cn('hidden md:block', { [`!block ${className ?? ''}`]: noTransform })}
				color="accentPrimary"
				label={t('actions.labels.connect')}
				onClick={handleLoginClick}
				data-testid={'DaoMenu__unauthorizedConnectButton'}
			/>
			<Button
				size="md"
				className={cn('xs:mr-0 mr-4 block h-[32px] w-[32px] justify-center px-[8px] md:hidden', {
					[`!hidden ${className ?? ''}`]: noTransform
				})}
				color="accentPrimary"
				label={<LoginIcon />}
				onClick={handleLoginClick}
			/>
		</div>
	);
};
