// TODO: Use common token model from "tokens" lib
// see https://gitlab.superdao.co/dev/common/app/-/merge_requests/990

export type Token = {
	/**
	 * CoinMarketCap token ID
	 * @see https://coinmarketcap.com/api/documentation/v1/#section/Best-Practices
	 *
	 * To get ID for the concrete token by its symbol (for example, ETH) use handle "CoinMarketCap ID Map"
	 * @see https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyMap
	 */
	id: number;

	tokenAddress: string;

	symbol: string;

	name: string;

	decimals: number;

	logo: string | null;
};
