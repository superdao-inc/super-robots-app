import intersection from 'lodash/intersection';

export const getTiersNames = (tiersHash: Record<string, string>, tiers: Array<string | null>): string[] => {
	const intersectedTiers = intersection(Object.keys(tiersHash), tiers);
	const namedTiers = intersectedTiers.map((tier) => tiersHash[tier ?? '']);
	return namedTiers;
};
