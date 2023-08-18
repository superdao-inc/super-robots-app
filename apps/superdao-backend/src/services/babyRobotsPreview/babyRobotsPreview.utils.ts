import { layersMeta } from './babyRobotsPreview.constants';

export const divide = (str: string, index: number) => {
	return [str.slice(0, index), str.slice(index)];
};

export const generateByIndexes = (meta: typeof layersMeta, indexVector: number[]) => {
	if (indexVector.length !== meta.length) {
		throw new Error('incorrect index vector length');
	}

	let style = '';
	let finalLayers = [];

	let i = 0;
	for (const layer of meta) {
		const index = indexVector[i];
		style = index.toString(2).padStart(layer.digits, '0') + style;
		if (index) {
			finalLayers.push(layer.names[index - 1]);
		}
		i++;
	}
	return {
		styleId: parseInt(style, 2).toString(16).toUpperCase(),
		layers: finalLayers
	};
};
