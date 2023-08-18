const generateNumberFromSeed = (seed: string) => {
	return seed.split('').reduce((acc, item, index) => acc + item.charCodeAt(0) + index, 0);
};

const generateCoverHsl = (hue: number) => {
	return `hsl(${hue}, 100%, 55%)`;
};

export const generateCoverGradient = (seed: string) => {
	const randomHue = generateNumberFromSeed(seed);

	const fromColor = generateCoverHsl(randomHue);
	const toColor = generateCoverHsl(randomHue - 20);

	return `linear-gradient(135deg, ${fromColor} 0%, ${toColor} 100%)`;
};
