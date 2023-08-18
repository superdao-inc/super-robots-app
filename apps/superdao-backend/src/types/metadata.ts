export type ERC721CustomAttribute = {
	display_type?: string;
	trait_type?: string;
	sd_trait?: string;
	value: string | number;
};

export type ERC721CollectionMetadata = {
	name: string;
	description: string;
	external_link: string;
	seller_fee_basis_points: number;
	fee_recipient: string;
	tiers: Array<string>;
};

export type ERC721TokenMetadata = {
	name: string;
	description: string;
	image: string | undefined;
	animation_url: string | undefined;
	attributes: ERC721CustomAttribute[];
};

export type ExtendedERC721TokenMetadata = ERC721TokenMetadata & {
	description?: string | null; // TODO(@szavarzin) - remove field and extending type?
};

export const TierTraitType = 'Tier';

export enum MetadataAttributesSdTraits {
	ACHIEVEMENT_LABEL_SD_TRAIT = 'ACHIEVEMENT_LABEL_SD_TRAIT',
	ACHIEVEMENT_XP_SD_TRAIT = 'ACHIEVEMENT_XP_SD_TRAIT',
	BENEFIT_SD_TRAIT = 'BENEFIT_SD_TRAIT',
	TIER_SD_TRAIT = 'TIER_SD_TRAIT',
	TIER_TYPE_SD_TRAIT = 'TIER_TYPE_SD_TRAIT'
}

export enum MetadataTierTypeAttributeValues {
	achievement = 'achievement',
	membership = 'membership'
}

export const achievementSDTraits = [
	MetadataAttributesSdTraits.TIER_TYPE_SD_TRAIT,
	MetadataAttributesSdTraits.ACHIEVEMENT_LABEL_SD_TRAIT,
	MetadataAttributesSdTraits.ACHIEVEMENT_XP_SD_TRAIT
];
