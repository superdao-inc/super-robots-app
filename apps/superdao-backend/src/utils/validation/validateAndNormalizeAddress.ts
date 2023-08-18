import { utils as etherUtils } from 'ethers';

export const validateAndNormalizeAddress = (value: string) => {
	try {
		return etherUtils.getAddress(value);
	} catch (error) {
		throw new Error('Invalid address');
	}
};
