import { allTokens } from '../constants';

export const getTokenDecimalsBySymbol = (symbol: string): number =>
	allTokens.find((t) => t.symbol === symbol)?.decimals ?? 18;
