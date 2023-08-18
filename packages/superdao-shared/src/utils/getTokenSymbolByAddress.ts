import { ethereumTokens, polygonTokens } from '../constants';

export const getTokenSymbolByAddress = (address: string): string | undefined => {
	return [...ethereumTokens, ...polygonTokens].find(
		(token) => token.tokenAddress.toLowerCase() === address.toLowerCase()
	)?.symbol;
};
