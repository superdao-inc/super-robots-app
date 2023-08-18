export const ipfsToHttpUrl = (url?: string | null): string | null => {
	if (!url) return null;
	return url.startsWith('ipfs') ? `https://ipfs.io/ipfs/${url.replace(/(^\w+:|^)\/\//, '')}` : url;
};
