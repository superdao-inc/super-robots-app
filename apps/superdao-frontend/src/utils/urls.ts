import { polygonScanUrl, safeAppUrl } from 'src/constants';

export const toUrlWithProtocol = (raw: string) => {
	if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;
	return `https://${raw}`;
};

export const openExternal = (url: string) => {
	window.open(toUrlWithProtocol(url), '_blank', 'noopener,noreferrer');
};

export const getOpenseaNftUrl = (collectionAddress: string, tokenId?: string) =>
	`https://opensea.io/assets/matic/${collectionAddress}/${tokenId || ''}`;

// TODO create util or service with Safe urls generation methods
export const getSafeAppUrl = (address: string, chain: string = 'matic') => {
	return `${safeAppUrl}/${chain}:${address}`;
};
// TODO create util or service with Safe urls generation methods
export const getSafeAppTransactionUrl = (address: string, hash: string, chain: string = 'matic') => {
	return `${safeAppUrl}/${chain}:${address}/transactions/multisig_${address}_${hash}`;
};

export const openPolygonScanByAddressAsExternal = (address: string): void => {
	openExternal(`${polygonScanUrl}/address/${address}`);
};

export const openPolygonScanByTransactionAsExternal = (hash: string): void => {
	openExternal(`${polygonScanUrl}/tx/${hash}`);
};

export const getOpensealCollectionSearchUrl = (collectionAddress: string) =>
	`https://opensea.io/assets?search[query]=${collectionAddress}`;

export const getOpenseaCollectionUrl = (collectionSlug: string) =>
	`https://opensea.io/collection/${collectionSlug.toLowerCase()}`;

export const getOpenseaTiersUrl = (tierName: string, collectionAddress: string, collectionUrl?: string) => {
	let openseaCollectionUrl = collectionUrl || getOpensealCollectionSearchUrl(collectionAddress);
	tierName = encodeURIComponent(tierName);

	return collectionUrl
		? `${openseaCollectionUrl}?search[stringTraits][0][name]=Tier&search[stringTraits][0][values][0]=${tierName}`
		: openseaCollectionUrl;
};
