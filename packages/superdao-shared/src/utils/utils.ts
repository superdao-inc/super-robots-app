import { TransformFnParams } from 'class-transformer/types/interfaces';
import { utils as etherUtils } from 'ethers';
import { v4 as uuidv4 } from 'uuid';

export const sanitizeString = (value: string) =>
	value
		.replace(/^\s+|\s+$/g, '')
		.replace(/(\r\n|\r|\n){2,}/g, '$1\n')
		.trim();

export const sanitizeStringTransform = ({ value }: TransformFnParams) =>
	value
		.replace(/^\s+|\s+$/g, '')
		.replace(/(\r\n|\r|\n){2,}/g, '$1\n')
		.trim();

export const sanitizeAddressTransform = ({ value }: TransformFnParams) => etherUtils.getAddress(value);

const isUrlWithProtocol = (raw: string) => {
	try {
		// @ts-ignore
		// eslint-disable-next-line no-new
		new URL(raw);
		return true;
	} catch (e) {
		return false;
	}
};

const isSocialLink = (raw: string) =>
	['t.me/', 'twitter.com/', 'instagram.com/', 'discord.com/invite/', 'facebook.com/'].some((prefix) =>
		raw.startsWith(prefix)
	);

const isUsername = (raw: string) => raw.startsWith('@');

export const getPathnameFromUrl = (url: string | null | undefined) => {
	if (!url) return '';

	let sanitizedString: string;
	try {
		sanitizedString = new URL(url).pathname.replace('/', '');
	} catch (e) {
		sanitizedString = url;
	}

	return sanitizedString;
};

const getSocialId = (raw: string) => {
	if (isUsername(raw)) return raw.replace('@', '');

	if (isUrlWithProtocol(raw)) return getPathnameFromUrl(raw);

	if (isSocialLink(raw)) return getPathnameFromUrl(`https://${raw}`);

	return raw;
};

export const transformSocialLink =
	(kind: 'twitter' | 'telegram' | 'discord' | 'instagram' | 'facebook') => (raw: string | null | undefined) => {
		if (raw === null || raw === undefined || raw === '') return null;

		const prefixesByKind: Record<typeof kind, string> = {
			discord: 'discord.com',
			telegram: 't.me',
			twitter: 'twitter.com',
			instagram: 'instagram.com',
			facebook: 'facebook.com'
		};

		return `https://${prefixesByKind[kind]}/${getSocialId(raw)}`;
	};

export const paginatedResponsePlaceholder = () => ({
	count: 0,
	items: []
});

export const getNewTierId = () => {
	return uuidv4().replace(/-/g, '').slice(0, -1).toUpperCase();
};

export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
