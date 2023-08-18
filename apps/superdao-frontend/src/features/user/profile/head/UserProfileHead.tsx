import { useTranslation } from 'next-i18next';
import { memo, useCallback, useMemo } from 'react';
import copy from 'clipboard-copy';
import { useRouter } from 'next/router';

import { getOptimizedFileUrl } from 'src/utils/upload';
import { shrinkWallet } from '@sd/superdao-shared';
import { Body, Button, CopyIcon, DoneIcon, Label1, SocialLinks, Title1, UserAvatar } from 'src/components';
import { CollapsableDescription } from 'src/components/collapsableDescription';
import { toast } from 'src/components/toast/toast';
import { colors } from 'src/style';
import { openExternal } from 'src/utils/urls';
import { PATH_USERS } from 'src/features/user/constants';
import { PublicUserFragment } from 'src/gql/user.generated';
import { DEFAULT_COVER_FILE_ID } from 'src/constants/cover';

type UserProfileHeadProps = {
	user: PublicUserFragment;
	isCurrentUserProfile: boolean;
};

const UserProfileHead = (props: UserProfileHeadProps) => {
	const { user, isCurrentUserProfile } = props;

	const { id: userId, slug, displayName, bio: description, walletAddress, ens, avatar, cover, links } = user;
	const { site, telegram, twitter, instagram, discord } = links;

	const { t } = useTranslation();

	const { push } = useRouter();

	const hasAnySocialLink = twitter || instagram || discord || telegram || site;

	const handleProfileEdit = useMemo(() => {
		if (isCurrentUserProfile) {
			return () => push(`${PATH_USERS}/${slug}/edit`);
		}
	}, [slug, isCurrentUserProfile, push]);

	const handleSocialLinkClick = useCallback((link: string) => openExternal(link), []);

	const handleWalletAddressCopy = useCallback(async () => {
		if (!walletAddress) return;

		await copy(walletAddress);

		toast(
			<div className="flex items-center gap-2">
				<DoneIcon className="h-6 w-6" fill={colors.accentPositive} /> <Label1>{t('actions.confirmations.copy')}</Label1>
			</div>,
			{ id: 'wallet-address-copy' }
		);
	}, [walletAddress, t]);

	const ensOrAddress = ens || walletAddress;

	const title = displayName || ensOrAddress;

	return (
		<>
			<div className="bg-backgroundSecondary xs:rounded-xl">
				<div
					className="xs:rounded-tl-xl xs:rounded-tr-xl h-[180px] !bg-cover !bg-center"
					style={{
						background: `url(${getOptimizedFileUrl(cover || DEFAULT_COVER_FILE_ID)})`
					}}
					data-testid="Profile__cover"
				/>

				<main className="bg-backgroundSecondary relative flex w-full flex-col items-center rounded-xl px-6 py-5 lg:mt-0 lg:items-start lg:rounded-none lg:rounded-b-xl">
					<UserAvatar
						className="bg-backgroundSecondary border-backgroundSecondary absolute top-0 -translate-y-1/2 transform rounded-full border-[8px] lg:left-5"
						seed={userId}
						src={avatar ? getOptimizedFileUrl(avatar) : undefined}
						size="112"
						data-testid="Profile__avatar"
					/>

					<div className="hidden h-8 self-end lg:flex">
						{handleProfileEdit && !hasAnySocialLink ? (
							<Button
								onClick={handleProfileEdit}
								color="backgroundTertiary"
								size="md"
								label={t('components.user.actions.edit')}
							/>
						) : (
							<SocialLinks
								twitter={twitter}
								discord={discord}
								telegram={telegram}
								instagram={instagram}
								site={site}
								onSocialLinkClick={handleSocialLinkClick}
							/>
						)}
					</div>

					<Title1
						className="mt-11 w-full truncate text-center lg:mt-3 lg:w-full lg:text-start"
						data-testid="Profile__name"
					>
						{title}
					</Title1>

					<div
						className="flex max-w-[min(370px,100%)] items-center justify-center gap-1 lg:justify-start"
						data-testid="Profile__wallet"
					>
						<Body color={colors.foregroundSecondary}>{shrinkWallet(walletAddress)}</Body>

						<button
							className="hover:bg-overlaySecondary flex h-6 w-6 items-center justify-center rounded-full"
							onClick={handleWalletAddressCopy}
						>
							<CopyIcon width={16} height={16} />
						</button>
					</div>

					{description && <CollapsableDescription description={description} />}

					{hasAnySocialLink && (
						<div className="mt-4 mb-1.5 flex lg:mb-0 lg:mt-0 lg:hidden">
							<SocialLinks
								site={site}
								twitter={twitter}
								discord={discord}
								telegram={telegram}
								instagram={instagram}
								onSocialLinkClick={handleSocialLinkClick}
							/>
						</div>
					)}
				</main>
			</div>
		</>
	);
};

export default memo(UserProfileHead);
