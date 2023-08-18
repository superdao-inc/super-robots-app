import { Chain } from './chain';
import { polygonTokens, ethereumTokens, Token } from './token';

export const tokensMap: Record<Chain, Token[]> = {
	[Chain.Polygon]: polygonTokens,
	[Chain.Ethereum]: ethereumTokens
};
