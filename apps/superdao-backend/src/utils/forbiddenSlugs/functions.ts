import {
	forbiddenDaoSlugs,
	forbiddenSlugs,
	forbiddenTierNames,
	forbiddenUserSlugs,
	Slug
} from 'src/utils/forbiddenSlugs/forbiddenSlugs';

export const getForbiddenSlugs = (): Record<Slug, string[]> => {
	return forbiddenSlugs;
};

export const isForbiddenDaoSlug = (daoSlug: string): boolean => {
	return forbiddenDaoSlugs.includes(daoSlug);
};

export const isForbiddenUserSlug = (userSlug: string): boolean => {
	return forbiddenUserSlugs.includes(userSlug);
};

export const isForbiddenTierName = (tierName: string): boolean => {
	return forbiddenTierNames.includes(tierName);
};
