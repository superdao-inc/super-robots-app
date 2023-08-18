export const IMPORT_CSV_WHITELIST_SEARCH_PARAM = 'isWhitelist';
export const IMPORT_CSV_AIRDROP_SEARCH_PARAM = 'isAirdrop';
export const MANUAL_WHITELIST_SEARCH_PARAM = 'addToWhitelist';
export const MANUAL_BY_EMAIL_SEARCH_PARAM = 'isAirdropByEmail';

export const airdropAndWhitelistPageUrls = [
	`/members/manual?${MANUAL_BY_EMAIL_SEARCH_PARAM}=1`,
	`/members/manual?${MANUAL_WHITELIST_SEARCH_PARAM}=1`,
	'/members/manual',
	`/members?${IMPORT_CSV_WHITELIST_SEARCH_PARAM}=1`,
	`/members?${IMPORT_CSV_AIRDROP_SEARCH_PARAM}=1`
];
