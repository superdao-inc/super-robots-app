import { ethers } from 'ethers';

/**
 * Formats tier id before to the format expected buy the contract <code>buy()<code> method.
 * @param tier
 */
export const formatTier = (tier: string) => {
	return ethers.utils.formatBytes32String(tier.toUpperCase());
};

// TODO: replace ethers.utils.formatBytes32String(tier.toUpperCase()); with this method everywhere
