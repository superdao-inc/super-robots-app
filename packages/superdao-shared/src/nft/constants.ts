import { ethers } from 'ethers';
import { POLYGON_ADDRESS_MAP } from '../constants';

export const TIER_PROP = 'TIER';
export const NAME = 'NAME';
export const MAX_AMOUNT = 'MAX_AMOUNT';
export const TOTAL_AMOUNT = 'TOTAL_AMOUNT';
export const IS_TRANSFERABLE = 'IS_TRANSFERABLE';
export const TRANSFER_UNLOCKS_AT_HOURS = 'TRANSFER_UNLOCKS_AT_HOURS';
export const TIER_RANDOM_MINT = 'TIER_RANDOM_MINT';
export const TIER_RANDOM_SHUFFLE_MINT = 'TIER_RANDOM_SHUFFLE_MINT';
export const TIER_EXTRA_ARTWORKS_NUM = 'TIER_EXTRA_ARTWORKS_NUM';
export const DEACTIVATED = 'DEACTIVATED';
export const DELETED = 'DELETED';
export const isValidRandomValue = '0x0100000000000000000000000000000000000000000000000000000000000000';

export const hexOneBytes32 = ethers.utils.hexZeroPad(ethers.utils.hexlify(1), 32);

export type TierParams = {
	name: string;
	isTransferable: boolean;
	maxAmount: ethers.BigNumber;
	isRandom: boolean;
	hasRandomShuffleMint: boolean;
	images: string[];
	animation?: string | undefined;
};

export const DEFAULT_TIER_PRICE = 0.001;

export const defaultTierPriceBigNum = ethers.utils.parseUnits(
	DEFAULT_TIER_PRICE.toString(),
	POLYGON_ADDRESS_MAP.MATIC.decimals
);

export const defaultTiers: Record<string, TierParams> = {
	'1B32982113A94CF481E4BEE67BCE379': {
		name: 'Core Team',
		isTransferable: false,
		maxAmount: ethers.BigNumber.from(10),
		isRandom: false,
		hasRandomShuffleMint: false,
		images: ['ipfs://QmWk6fFz6TEXT78mFwD7vmCSB2HhPcaZX5ujfZrCdJzYa6'],
		animation: 'ipfs://Qme15N1BRmMVXW2oPtDP6KGKKUU6g9fpbuPJdiaaUJzFXA'
	},
	'1DC8A254EAD747548DE5AD4F858588A': {
		name: 'Contributor',
		isTransferable: false,
		maxAmount: ethers.BigNumber.from(100),
		isRandom: false,
		hasRandomShuffleMint: false,
		images: ['ipfs://QmbxFL7RkMjuZggc8pJK3tMy6nv8z46pEK6dHy8LdTVDXa'],
		animation: 'ipfs://QmYXH97mpH4npQZ5AL26oCLCg3sYWANSBTS1yDSmbJS1Vu'
	},
	'36B7D735D8194EDF946CF264201F60A': {
		name: 'Member',
		isTransferable: false,
		maxAmount: ethers.BigNumber.from(1000),
		isRandom: false,
		hasRandomShuffleMint: false,
		images: ['ipfs://QmU4rPtHnmqUuB9y4kx8Ct6fnFbHpR3HTdYYthrF4Fk3sX'],
		animation: 'ipfs://QmWadQJcQd36EVytoX2TsyGcj9QU57hrECxaTWxS7d5qv7'
	}
};

export const getDefaultTiersForClaim = () => {
	const attributes = [];
	const unlockDate = new Date();
	unlockDate.setDate(unlockDate.getDate() + 7);

	for (const tierId of Object.keys(defaultTiers)) {
		const tier = defaultTiers[tierId];
		const id = ethers.utils.formatBytes32String(tierId);

		attributes.push({
			tierId: id,
			attrName: NAME,
			value: ethers.utils.formatBytes32String(tier.name)
		});

		attributes.push({
			tierId: id,
			attrName: IS_TRANSFERABLE,
			value: ethers.utils.hexZeroPad(ethers.BigNumber.from(0).toHexString(), 32)
		});

		attributes.push({
			tierId: id,
			attrName: TRANSFER_UNLOCKS_AT_HOURS,
			value: ethers.utils.hexZeroPad(
				ethers.BigNumber.from(Math.floor(unlockDate.getTime() / 1000 / 60 / 60)).toHexString(),
				32
			)
		});

		if (tier.isRandom) {
			attributes.push({
				tierId: id,
				attrName: MAX_AMOUNT,
				value: ethers.utils.hexZeroPad(tier.maxAmount.toHexString(), 32)
			});
			attributes.push({
				tierId: id,
				attrName: TIER_EXTRA_ARTWORKS_NUM,
				value: ethers.utils.hexZeroPad(
					ethers.BigNumber.from(tier.images.length > 1 ? tier.images.length - 1 : tier.images.length).toHexString(),
					32
				)
			});
			attributes.push({
				tierId: id,
				attrName: TIER_RANDOM_MINT,
				value: isValidRandomValue
			});
			attributes.push({
				tierId: id,
				attrName: TIER_RANDOM_SHUFFLE_MINT,
				value: ethers.utils.hexZeroPad(ethers.BigNumber.from(0).toHexString(), 32)
			});
		} else if (tier.hasRandomShuffleMint) {
			attributes.push({
				tierId: id,
				attrName: MAX_AMOUNT,
				value: ethers.utils.hexZeroPad(tier.maxAmount.toHexString(), 32)
			});
			const maxAmount = tier.maxAmount.toNumber();
			attributes.push({
				tierId: id,
				attrName: TIER_EXTRA_ARTWORKS_NUM,
				value: ethers.utils.hexZeroPad(
					maxAmount > 1 ? ethers.BigNumber.from(maxAmount - 1).toHexString() : tier.maxAmount.toHexString(),
					32
				)
			});
			attributes.push({
				tierId: id,
				attrName: TIER_RANDOM_MINT,
				value: ethers.utils.hexZeroPad(ethers.BigNumber.from(0).toHexString(), 32)
			});
			attributes.push({
				tierId: id,
				attrName: TIER_RANDOM_SHUFFLE_MINT,
				value: isValidRandomValue
			});
		} else {
			attributes.push({
				tierId: id,
				attrName: MAX_AMOUNT,
				value: ethers.utils.hexZeroPad(tier.maxAmount.toHexString(), 32)
			});
			attributes.push({
				tierId: id,
				attrName: TIER_EXTRA_ARTWORKS_NUM,
				value: ethers.utils.hexZeroPad(
					ethers.BigNumber.from(tier.images.length > 1 ? tier.images.length : 0).toHexString(),
					32
				)
			});
			attributes.push({
				tierId: id,
				attrName: TIER_RANDOM_MINT,
				value: ethers.utils.hexZeroPad(ethers.BigNumber.from(0).toHexString(), 32)
			});
			attributes.push({
				tierId: id,
				attrName: TIER_RANDOM_SHUFFLE_MINT,
				value: ethers.utils.hexZeroPad(ethers.BigNumber.from(0).toHexString(), 32)
			});
		}
		attributes.push({
			tierId: id,
			attrName: TIER_RANDOM_MINT,
			value: ethers.utils.hexZeroPad(ethers.BigNumber.from(tier.isRandom ? 1 : 0).toHexString(), 32)
		});

		attributes.push({
			tierId: id,
			attrName: TIER_EXTRA_ARTWORKS_NUM,
			value: ethers.utils.hexZeroPad(
				ethers.BigNumber.from(tier.images.length > 1 ? tier.images.length : 0).toHexString(),
				32
			)
		});

		attributes.push({
			tierId: id,
			attrName: TIER_RANDOM_SHUFFLE_MINT,
			value: ethers.utils.hexZeroPad(ethers.BigNumber.from(tier.hasRandomShuffleMint ? 1 : 0).toHexString(), 32)
		});
	}

	return attributes;
};

export type TIER_ATTRIBUTE_VALUE =
	| 'MAX_AMOUNT'
	| 'TOTAL_AMOUNT'
	| 'NAME'
	| 'DEACTIVATED'
	| 'TIER_RANDOM_MINT'
	| 'TIER_RANDOM_SHUFFLE_MINT'
	| 'TIER_EXTRA_ARTWORKS_NUM'
	| 'IS_TRANSFERABLE'
	| 'TRANSFER_UNLOCKS_AT_HOURS';

export const TIER_ATTRIBUTES: Record<string, TIER_ATTRIBUTE_VALUE> = {
	MAX_AMOUNT: 'MAX_AMOUNT',
	TOTAL_AMOUNT: 'TOTAL_AMOUNT',
	NAME: 'NAME',
	DEACTIVATED: 'DEACTIVATED',
	TIER_RANDOM_MINT: 'TIER_RANDOM_MINT',
	TIER_RANDOM_SHUFFLE_MINT: 'TIER_RANDOM_SHUFFLE_MINT',
	TIER_EXTRA_ARTWORKS_NUM: 'TIER_EXTRA_ARTWORKS_NUM',
	IS_TRANSFERABLE: 'IS_TRANSFERABLE',
	TRANSFER_UNLOCKS_AT_HOURS: 'TRANSFER_UNLOCKS_AT_HOURS'
};

export type ATTRIBUTE_KEY_MAP =
	| 'maxAmount'
	| 'totalAmount'
	| 'tierName'
	| 'isDeactivated'
	| 'isRandom'
	| 'hasRandomShuffleMint'
	| 'extraArtworks'
	| 'isTransferable'
	| 'transferUnlockDate';

export const ATTIRIBUTES_TO_KEY_MAP: Record<TIER_ATTRIBUTE_VALUE, ATTRIBUTE_KEY_MAP> = {
	MAX_AMOUNT: 'maxAmount',
	TOTAL_AMOUNT: 'totalAmount',
	NAME: 'tierName',
	DEACTIVATED: 'isDeactivated',
	TIER_RANDOM_MINT: 'isRandom',
	TIER_RANDOM_SHUFFLE_MINT: 'hasRandomShuffleMint',
	TIER_EXTRA_ARTWORKS_NUM: 'extraArtworks',
	IS_TRANSFERABLE: 'isTransferable',
	TRANSFER_UNLOCKS_AT_HOURS: 'transferUnlockDate'
};

export const TIER_TYPES: Record<TIER_ATTRIBUTE_VALUE, 'number' | 'string' | 'boolean'> = {
	NAME: 'string',
	MAX_AMOUNT: 'number',
	TOTAL_AMOUNT: 'number',
	DEACTIVATED: 'boolean',
	TIER_RANDOM_MINT: 'boolean',
	TIER_RANDOM_SHUFFLE_MINT: 'boolean',
	IS_TRANSFERABLE: 'boolean',
	TIER_EXTRA_ARTWORKS_NUM: 'number',
	TRANSFER_UNLOCKS_AT_HOURS: 'number'
};
