import { commonTokens } from './commonTokens';
import { Token } from './token.model';
import { MATIC } from './tokenSymbols';

/**
 * Polygon (Matic) token CoinMarketCap id.
 */
export const POLYGON_TOKEN_ID = 3890;
export const MATIC_TOKEN_ADDRESS_FOR_VIA = '0x0000000000000000000000000000000000000000';
export const MATIC_TOKEN_ADDRESS = '0x0000000000000000000000000000000000001010';
export const WRAPPED_MATIC_TOKEN_ADDRESS = '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270';

const POLYGON_ADDRESS_MAP = {
	825: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
	3408: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
};

export const polygonOnlyTokens: Token[] = [
	{
		id: POLYGON_TOKEN_ID,
		name: 'Polygon',
		symbol: MATIC,
		logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
		tokenAddress: MATIC_TOKEN_ADDRESS,
		decimals: 18
	}
];

const commonTokensWithPolygonAddresses = commonTokens.map((token) => ({
	...token,
	// @ts-expect-error
	tokenAddress: POLYGON_ADDRESS_MAP[token.id]
}));

export const polygonTokens: Token[] = [...polygonOnlyTokens, ...commonTokensWithPolygonAddresses];
