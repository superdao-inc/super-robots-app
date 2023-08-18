import { Chain } from '../chain';

export const MATIC = 'MATIC';
export const ETH = 'ETH';

export const NATIVE_TOKEN_SYMBOLS = {
	[Chain.Ethereum]: ETH,
	[Chain.Polygon]: MATIC
};
