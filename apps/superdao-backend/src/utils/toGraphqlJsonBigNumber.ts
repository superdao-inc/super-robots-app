import { ethers } from 'ethers';

export const toGraphqlJsonBigNumber = (value?: ethers.BigNumber) => {
	if (!value) return;

	return {
		type: 'BigNumber',
		hex: value._hex
	};
};
