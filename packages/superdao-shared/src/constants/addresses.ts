export const POLYGON_ADDRESS_MAP = {
	MATIC: {
		address: '0x0000000000000000000000000000000000001010',
		decimals: 18
	},
	WRAPPED_MATIC: {
		address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
		decimals: 18
	},
	USDT: {
		address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
		decimals: 6
	},
	USDC: {
		address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
		decimals: 6
	}
} as const;

export const AVAILABLE_TOKENS_LIST = Object.values(POLYGON_ADDRESS_MAP).map((value) => value.address.toUpperCase());
