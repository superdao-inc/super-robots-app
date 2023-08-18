import { NavBuyIcon } from '../common/navIcons/buyIcon';
import { NavDiscordIcon } from '../common/navIcons/discordIcon';
import { NavFaqIcon } from '../common/navIcons/faqIcon';
import { NavRoadmapIcon } from '../common/navIcons/roadmapIcon';
import { NavTwitterIcon } from '../common/navIcons/twitterIcon';

export const linksConfig = [
	{
		text: 'FAQ',
		link: '/faq'
	},
	{
		text: 'Roadmap',
		link: '/roadmap'
	},
	{
		text: 'OpenSea',
		link: 'https://opensea.io/collection/super-robots-by-superdao'
	},
	{
		text: 'Twitter',
		link: 'https://twitter.com/robots_xyz'
	},
	{
		text: 'Discord',
		link: 'https://discord.gg/8V95n8Y42H'
	}
];

export const sidebarLinksConfig = [
	{
		icon: NavFaqIcon,
		text: 'FAQ',
		link: '/faq'
	},
	{
		icon: NavRoadmapIcon,
		text: 'Roadmap',
		link: '/roadmap'
	},
	{
		icon: NavBuyIcon,
		text: 'Buy Robot',
		link: 'https://opensea.io/collection/super-robots-by-superdao'
	},
	{
		icon: NavTwitterIcon,
		text: 'Twitter',
		link: 'https://twitter.com/robots_xyz'
	},
	{
		icon: NavDiscordIcon,
		text: 'Discord',
		link: 'https://discord.gg/rHAq2SFh66'
	}
];
