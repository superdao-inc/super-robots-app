import { Token } from './token.model';
import { ETH } from './tokenSymbols';
import { commonTokens } from './commonTokens';

/**
 * Ethereum token CoinMarketCap id.
 */
export const ethereumTokenId = 1027;

const ETHEREUM_ADDRESS_MAP = {
	825: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
	3408: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
};

export const ethereumOnlyTokens: Token[] = [
	{
		id: ethereumTokenId,
		name: 'Ethereum',
		symbol: ETH,
		logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
		decimals: 18,
		tokenAddress: '0x0000000000000000000000000000000000000000'
	}
];

const commonTokensWithEthereumAddresses = commonTokens.map((token) => ({
	...token,
	// @ts-ignore
	tokenAddress: ETHEREUM_ADDRESS_MAP[token.id]
}));

export const ethereumTokens: Token[] = [...ethereumOnlyTokens, ...commonTokensWithEthereumAddresses];
