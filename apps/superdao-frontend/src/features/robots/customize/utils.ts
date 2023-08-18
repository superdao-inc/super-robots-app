import { PROPERTY_LAYERS, getCurrentPartsConfig, getCurrentPartsVersion } from '@sd/superdao-shared';

const getRandomYesOrNo = () => {
	return Math.round(Math.random());
};

const getRandomBetween = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomRobotImageName = (isUsingOddVersion: boolean) => {
	const currentVersion = getCurrentPartsVersion(isUsingOddVersion);

	const randomLayers = getRandomRandomLayers(currentVersion);

	const propertiesLayer = getRandomPropertyLayer();

	const layers = { ...randomLayers, ...propertiesLayer };

	const sortedLayers = Object.entries(layers).sort(([prevKey], [nextKey]) => {
		return prevKey > nextKey ? 1 : -1;
	});

	const layersNames = [];

	for (let i = 0; i < sortedLayers.length; i++) {
		layersNames.push(sortedLayers[i].join('_'));
	}

	const name = layersNames.join('-');

	return `${currentVersion}-${name}`;
};

const getRandomPropertyLayer = () => {
	const acc: Partial<Record<keyof typeof PROPERTY_LAYERS, string>> = {};

	if (getRandomYesOrNo()) {
		acc['FEEDBACK'] = '1';
	}

	if (getRandomYesOrNo()) acc['TWITTER'] = '1';

	if (getRandomYesOrNo()) acc['ENS'] = '1';

	if (getRandomYesOrNo()) acc['LENS'] = '1';

	if (getRandomYesOrNo()) acc['MIRROR'] = '1';

	if (getRandomYesOrNo()) return acc;

	acc['RANK'] = String(getRandomBetween(0, 3));

	return acc;
};

const getRandomRandomLayers = (currentVersion: string) => {
	const currentConfig = getCurrentPartsConfig(currentVersion);

	return {
		BG: getRandomBetween(1, currentConfig.BG),
		LEGS: getRandomBetween(1, currentConfig.LEGS),
		BODY: getRandomBetween(1, currentConfig.BODY),
		HEAD: getRandomBetween(1, currentConfig.HEAD),
		EYES: getRandomBetween(1, currentConfig.EYES),
		TUBES: getRandomBetween(1, currentConfig.TUBES)
	};
};
