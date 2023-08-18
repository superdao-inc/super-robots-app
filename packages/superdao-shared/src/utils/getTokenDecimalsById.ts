import { allTokens } from '../constants';

export const getTokenDecimalsById = (id: number): number | undefined => allTokens.find((t) => t.id === id)?.decimals;
