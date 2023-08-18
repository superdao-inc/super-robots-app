import classNames from 'classnames';
import { memo } from 'react';
import { IconButton } from 'src/components/button';
import { DiscordIcon, InstagramIcon, TelegramIcon, TwitterIcon, WebIcon } from 'src/components/assets/icons';

export type SocialsLinksProps = {
	twitter?: string | null;
	discord?: string | null;
	telegram?: string | null;
	instagram?: string | null;
	site?: string | null;
	className?: string;

	onSocialLinkClick?(link: string): void;
};

const COMMON_ICON_PROPS = {
	className: 'rounded-full opacity-60 hover:opacity-100 active:opacity-40 transition-all',
	color: 'iconBackground',
	size: 'lg',
	isSymmetric: true
} as const;

const SocialLinks = (props: SocialsLinksProps) => {
	const { twitter, discord, telegram, instagram, site, onSocialLinkClick, className = '' } = props;

	const handleSocialClick = (link: string) => () => onSocialLinkClick?.(link);

	const hasAnySocialLink = twitter || instagram || discord || telegram || site;

	if (!hasAnySocialLink) return null;

	return (
		<div className={classNames('flex h-10 gap-4', className)}>
			{site && (
				<IconButton
					onClick={handleSocialClick(site)}
					{...COMMON_ICON_PROPS}
					icon={<WebIcon fill="white" />}
					data-testid="Profile__siteButton"
				/>
			)}
			{twitter && (
				<IconButton
					onClick={handleSocialClick(twitter)}
					{...COMMON_ICON_PROPS}
					icon={<TwitterIcon fill="white" width={20} height={20} />}
					data-testid="Profile__twitterButton"
				/>
			)}
			{instagram && (
				<IconButton
					onClick={handleSocialClick(instagram)}
					{...COMMON_ICON_PROPS}
					icon={<InstagramIcon fill="white" width={20} height={20} />}
					data-testid="Profile__instagramButton"
				/>
			)}
			{telegram && (
				<IconButton
					onClick={handleSocialClick(telegram)}
					{...COMMON_ICON_PROPS}
					icon={<TelegramIcon fill="white" width={20} height={20} />}
					data-testid="Profile__telegramButton"
				/>
			)}
			{discord && (
				<IconButton
					onClick={handleSocialClick(discord)}
					{...COMMON_ICON_PROPS}
					icon={<DiscordIcon fill="white" width={20} height={20} />}
					data-testid="Profile__discordButton"
				/>
			)}
		</div>
	);
};

export default memo(SocialLinks);
