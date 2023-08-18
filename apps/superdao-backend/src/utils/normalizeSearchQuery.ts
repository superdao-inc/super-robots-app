/**
 * Escapes symbols '_' and '%'.
 * Use this method when searching something in db with 'ilike' operator.
 * For example, 'ilike user_1' will return user11, user21 and so on if not using such escaping.
 */
export const normalizeSearchQuery = (search: string) => {
	return search.trim().replace(/[\\%_]/g, '\\$&');
};
