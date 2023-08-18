import { utils as etherUtils } from 'ethers';

const MAX_WALLET_ADDRESS_LENGTH = 12;
const MAX_WALLET_ADDRESS_SMALL_LENGTH = 8;
const MAX_WALLET_ADDRESS_LARGE_LENGTH = 16;

export const shrinkValue = (value: string, startLength: number, endLength: number, maxLength: number) => {
	if (value.length <= maxLength) return value;
	return `${value.slice(0, startLength)}...${value.slice(value.length - endLength)}`;
};

export const shrinkWallet = (wallet: string) => {
	return shrinkValue(wallet, 6, 4, MAX_WALLET_ADDRESS_LENGTH);
};

export const shrinkSmallWallet = (wallet: string) => {
	return shrinkValue(wallet, 4, 4, MAX_WALLET_ADDRESS_SMALL_LENGTH);
};

export const shrinkLargeWallet = (wallet: string) => {
	return shrinkValue(wallet, 8, 8, MAX_WALLET_ADDRESS_LARGE_LENGTH);
};

export const getAddress = (address: string | any) => {
	try {
		return etherUtils.getAddress(address);
	} catch (error) {
		return null;
	}
};
