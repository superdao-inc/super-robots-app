import { Token } from './token.model';

/**
 * Tokens listed below exist in both: Ethereum and Polygon chains.
 */
export const commonTokens: Omit<Token, 'tokenAddress'>[] = [
	// Stablecoins
	{
		id: 825,
		name: 'Tether',
		symbol: 'USDT',
		logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
		decimals: 6
	},
	{
		id: 3408,
		name: 'USD Coin',
		symbol: 'USDC',
		logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
		decimals: 6
	}
];
