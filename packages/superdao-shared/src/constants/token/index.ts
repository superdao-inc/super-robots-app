import { ethereumOnlyTokens, ethereumTokens } from './ethereumTokens';
import { polygonOnlyTokens } from './polygonTokens';
import { FiatCoinMarketCapId } from './fiat';
import { commonTokens } from './commonTokens';
import { Token } from './token.model';

export { FiatCoinMarketCapId };
export { ethereumTokenId, ethereumTokens } from './ethereumTokens';
export * from './polygonTokens';
export * from './tokenSymbols';
export type { Token } from './token.model';

const mapTokenId = (token: Omit<Token, 'tokenAddress'>) => token.id;

export const allTokens = [...ethereumOnlyTokens, ...polygonOnlyTokens, ...commonTokens];
export const allTokensIds = allTokens.map(mapTokenId);
export const ethereumTokensIds = ethereumTokens.map(mapTokenId);
export const allTokensIdsWithUsdId = [...allTokensIds, FiatCoinMarketCapId.USD];
