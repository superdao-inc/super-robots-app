export const checkEnsDomain = (ens: string) => {
	const ensRegex = /^(.*).eth$/gm;

	return ens && ens.match(ensRegex);
};
