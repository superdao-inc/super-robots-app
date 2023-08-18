import { ethereumTokens } from '../constants';
import { polygonTokens } from '../constants';

/**
 * Returns CoinMarketCap token id for the passed token symbol or null if the token not found.
 */
export const getTokenIdBySymbol = (symbol: string): number | undefined => {
	const ethTokenId = ethereumTokens.find((t) => t.symbol === symbol)?.id;
	const polygonTokenId = polygonTokens.find((t) => t.symbol === symbol)?.id;

	return ethTokenId || polygonTokenId;
};
