import { MENTION_DELIMETER_PATTERN, MENTION_PATTERN } from 'src/constants/patterns';

/**
 *
 * @param bio string that returned by draft-js mention i.e. "some text \@[daoId | userId]"
 */
export const scanDaoIdsInBio = (bio: string): string[] => {
	return bio.match(MENTION_PATTERN)?.map((match) => match.slice(1)) ?? [];
};

/**
 *
 * @param bio string that returned by draft-js mention i.e. "some text \@[daoId | userId]"
 * @returns ["text", "@delimeter", "text"]
 */
export const prepareBio = (bio: string | null | undefined): string[] => {
	return bio ? bio.split(MENTION_DELIMETER_PATTERN) : [];
};
