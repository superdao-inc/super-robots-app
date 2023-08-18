import { BigNumberish, ethers } from 'ethers';

export const getFormattedToken = (tokenBalance: BigNumberish | null, decimals: BigNumberish = 18): number => {
	if (!tokenBalance) {
		return 0;
	}

	return +Number(ethers.utils.formatUnits(tokenBalance, decimals)).toFixed(3);
};
