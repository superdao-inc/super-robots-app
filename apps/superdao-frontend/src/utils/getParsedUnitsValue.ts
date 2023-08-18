import { BigNumberish, ethers } from 'ethers';

export const getParsedUnitsValue = (amount: number, decimals: BigNumberish = 18): string => {
	return ethers.utils.parseUnits(amount.toString(), decimals).toString();
};
