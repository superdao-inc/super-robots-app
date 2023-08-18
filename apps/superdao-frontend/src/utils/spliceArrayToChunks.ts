export const spliceArrayToChunks = <T extends {} = any>(array: T[], chunkSize: number): T[][] => {
	const arr = [...array];
	const res = [];

	while (arr.length > 0) {
		const chunk = arr.splice(0, chunkSize);
		res.push(chunk);
	}

	return res;
};
