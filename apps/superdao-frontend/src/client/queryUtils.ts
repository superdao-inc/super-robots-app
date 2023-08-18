export const generateInfinitePage = <T>(key: keyof T, data: T[typeof key]) => {
	return {
		pages: [{ [key]: data }],
		pagesParam: [0]
	};
};
