import { Chain, ethereumTokens } from '../constants';
import { polygonTokens } from '../constants';

export const getTokenAddressBySymbol = (symbol: string, chain: Chain): string | undefined => {
	if (chain === Chain.Ethereum) {
		return ethereumTokens.find((t) => t.symbol === symbol)?.tokenAddress;
	}

	if (chain === Chain.Polygon) {
		return polygonTokens.find((t) => t.symbol === symbol)?.tokenAddress;
	}

	return;
};
