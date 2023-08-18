import { Chain, polygonTokens, ethereumTokens, Token } from '../constants';

const getTokenAddressByIdInArray = (tokenId: number) => (arr: Token[]) =>
	arr.find((t) => t.id === tokenId)?.tokenAddress;

export const getTokenAddressById = (tokenId: number, chainId: Chain): string | undefined => {
	const getAddress = getTokenAddressByIdInArray(tokenId);
	switch (chainId) {
		case Chain.Ethereum: {
			return getAddress(ethereumTokens);
		}
		case Chain.Polygon: {
			return getAddress(polygonTokens);
		}
	}
};
