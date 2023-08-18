export const stringFromBase64 = (s: string) => Buffer.from(s, 'base64').toString('ascii');

export const getBase64EncodedJSON = (s: string | undefined) => {
	if (!s) return undefined;

	return JSON.parse(stringFromBase64(s));
};
