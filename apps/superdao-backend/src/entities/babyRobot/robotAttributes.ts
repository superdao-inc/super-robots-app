import { PropertyTrait } from './babyRobot.dto';
import { RobotLayer } from '@sd/superdao-shared';

type AttributeNameMap = Record<number, string>;

// ------------------------- ATTRIBUTES WITH NAMES -------------------------

export const bgNames: AttributeNameMap = {
	1: 'Bubblegum',
	2: 'Lemon',
	3: 'Plum',
	4: 'Sky',
	5: 'Lime',
	6: 'Silver',
	7: 'Amethyst',
	8: 'Azure',
	9: 'Canary',
	10: 'Charcoal',
	11: 'Flamingo',
	12: 'Jade'
};

export const eyesNames: AttributeNameMap = {
	1: 'Lime',
	2: 'Sky',
	3: 'Lemon',
	4: 'Silver',
	5: 'Plum',
	6: 'Bored Lime',
	7: 'Bored Silver',
	8: 'Bored Sky',
	9: 'Bored Lemon',
	10: 'Dreamy Lemon',
	11: 'Dreamy Lime',
	12: 'Dreamy Silver',
	13: 'Dreamy Sky',
	14: 'Shy Lemon',
	15: 'Shy Lime',
	16: 'Shy Silver',
	17: 'Shy Sky'
};

export const tubesNames: AttributeNameMap = {
	1: 'Bubblegum',
	2: 'Lemon',
	3: 'Plum',
	4: 'Sky',
	5: 'Lime',
	6: 'Iron Bubblegum',
	7: 'Iron Lemon',
	8: 'Iron Lime',
	9: 'Iron Orange',
	10: 'Iron Plum',
	11: 'Iron Sky',
	12: 'Metallic Bubblegum',
	13: 'Metallic Lemon',
	14: 'Metallic Lime',
	15: 'Metallic Orange',
	16: 'Metallic Plum',
	17: 'Metallic Sky',
	18: 'Ant Bubblegum',
	19: 'Ant Lemon',
	20: 'Ant Lime',
	21: 'Ant Orange',
	22: 'Ant Plum',
	23: 'Ant Sky',
	24: 'Kitty Bubblegum',
	25: 'Kitty Lemon',
	26: 'Kitty Lime',
	27: 'Kitty Orange',
	28: 'Kitty Plum',
	29: 'Kitty Sky',
	30: 'Halo',
	31: 'Horns'
};

const attributesNamesByLayer: Partial<Record<RobotLayer, AttributeNameMap>> = {
	BG: bgNames,
	EYES: eyesNames,
	TUBES: tubesNames
};

// ------------------------- LEGS -------------------------

/*
	1: 'Chucks Sky',
	2: 'Chucks Lime',
	3: 'Chucks Bubblegum',
	4: 'Chucks Plum',
	5: 'Chucks Lemon',
	6: 'Sneakers Charcoal Lime',
	7: 'Sneakers Snow Plum',
	8: 'Sneakers Silver Lemon',

	... Pumps ...

	21: 'Laced Boots Bubblegum',
	22: 'Laced Boots Lemon',
	23: 'Laced Boots Lime',
	24: 'Laced Boots Onyx',
	25: 'Laced Boots Orange',
	26: 'Laced Boots Plum',
	27: 'Laced Boots Sky',
	28: 'Laced Boots Snow',
	29: 'Laced Boots Metallic Bubblegum',
	30: 'Laced Boots Metallic Lemon',
	31: 'Laced Boots Metallic Lime',
	32: 'Laced Boots Metallic Orange',
	33: 'Laced Boots Metallic Plum',
	34: 'Laced Boots Metallic Sky',
	35: 'Sneakers Angelic White',
	36: 'Chucks Devilish Onyx',
*/

const getFootwearTypeByLegsLayer = (legsLayerIdx: number) => {
	if (legsLayerIdx <= 5) {
		return 'Chucks';
	}

	if (legsLayerIdx <= 8) {
		return 'Sneakers';
	}

	if (legsLayerIdx <= 20) {
		return 'Pumps';
	}

	if (legsLayerIdx <= 34) {
		return 'Laced Boots';
	}

	if (legsLayerIdx === 35) {
		return 'Sneakers';
	}

	return 'Chucks';
};

const legsColors: AttributeNameMap = {
	1: 'Sky',
	2: 'Lime',
	3: 'Bubblegum',
	4: 'Plum',
	5: 'Lemon',
	6: 'Charcoal Lime',
	7: 'Snow Plum',
	8: 'Silver Lemon',
	9: 'Onyx Bubblegum',
	10: 'Onyx Lemon',
	11: 'Onyx Lime',
	12: 'Onyx Orange',
	13: 'Onyx Plum',
	14: 'Onyx Sky',
	15: 'Silver Bubblegum',
	16: 'Silver Lemon',
	17: 'Silver Lime',
	18: 'Silver Orange',
	19: 'Silver Plum',
	20: 'Silver Sky',
	21: 'Bubblegum',
	22: 'Lemon',
	23: 'Lime',
	24: 'Onyx',
	25: 'Orange',
	26: 'Plum',
	27: 'Sky',
	28: 'Snow',
	29: 'Metallic Bubblegum',
	30: 'Metallic Lemon',
	31: 'Metallic Lime',
	32: 'Metallic Orange',
	33: 'Metallic Plum',
	34: 'Metallic Sky',
	35: 'Angelic White',
	36: 'Devilish Onyx'
};

export const getLegsLayerTraits = (legsLayerIdx: number): PropertyTrait[] => {
	const footwearType = getFootwearTypeByLegsLayer(legsLayerIdx);
	return [
		{
			trait_type: 'FOOTWEAR',
			value: footwearType
		},
		{
			trait_type: footwearType.toUpperCase(),
			value: legsColors[legsLayerIdx]
		}
	];
};

// ------------------------- BODY -------------------------

/*
	1: 'Hoodie Lime',
	2: 'Hoodie Sky',
	3: 'Hoodie Bubblegum',
	4: 'Hoodie Plum',
	5: 'Hoodie Lemon',
	6: 'Inflatable Puffer Smiley Sky',
	7: 'Inflatable Puffer Smiley Lime',
	8: 'Inflatable Puffer Smiley Orange',
	9: 'Inflatable Puffer Smiley Bubblegum',
	10: 'Inflatable Puffer Smiley Plum',
	11: 'Ombre Puffer Lime',
	12: 'Ombre Puffer Plum',
	13: 'Ombre Puffer Orange',
	14: 'Ombre Puffer Bubblegum',
	15: 'Ombre Puffer Sky',
	16: 'Super Puffer Plum',
	17: 'Super Puffer Sky',
	18: 'Super Puffer Lemon',
	19: 'Super Puffer Bubblegum',
	20: 'Super Puffer Lime',
	21: 'Puffer Sky',
	22: 'Puffer Lemon',
	23: 'Puffer Lime',
	24: 'Puffer Bubblegum',
	25: 'Puffer Plum',
	26: 'Super Hoodie Black',
	27: 'Super Hoodie Gray',
	28: 'Super Hoodie Lemon',
	29: 'Super Hoodie Lime',
	30: 'Super Hoodie Silver',
	31: 'Super Hoodie Snow',
	32: 'Super Hoodie Sky',
	33: 'Band Check Shirt B_W',
	34: 'Band Check Shirt Brown',
	35: 'Band Check Shirt Lime',
	36: 'Band Check Shirt Orange',
	37: 'Band Check Shirt Plum',
	38: 'Band Check Shirt Red',
	39: 'Band Check Shirt Sky',
	40: 'Band Shirt Washed Lavender',
	41: 'Band Shirt Washed Rose',
	42: 'Band Shirt Washed Sage',
	43: 'Band Shirt Washed Taupe',
	44: 'Band T-Chain Charcoal',
	45: 'Super Check Shirt B_W',
	46: 'Super Check Shirt Brown',
	47: 'Super Check Shirt Lime',
	48: 'Super Check Shirt Orange',
	49: 'Super Check Shirt Plum',
	50: 'Super Check Shirt Red',
	51: 'Super Check Shirt Sky',
	52: 'Super Shirt Washed Lavender',
	53: 'Super Shirt Washed Rose',
	54: 'Super Shirt Washed Sage',
	55: 'Super Shirt Washed Taupe',
	56: 'Super T-Chain Black',
	57: 'Super Cape Bubblegum',
	58: 'Super Cape Lemon',
	59: 'Super Cape Lime',
	60: 'Super Cape Orange',
	61: 'Super Cape Plum',
	62: 'Super Cape Sky',
	63: 'Puffer Angelic White',
	64: 'Hoodie Devilish Onyx'
*/

const getTopTypeByBodyLayer = (bodyLayerIdx: number) => {
	switch (true) {
		case bodyLayerIdx <= 5: {
			return 'Hoodie';
		}
		case bodyLayerIdx <= 10: {
			return 'Inflatable Puffer Smiley';
		}
		case bodyLayerIdx <= 15: {
			return 'Ombre Puffer';
		}
		case bodyLayerIdx <= 20: {
			return 'Super Puffer';
		}
		case bodyLayerIdx <= 25: {
			return 'Puffer';
		}
		case bodyLayerIdx <= 32: {
			return 'Super Hoodie';
		}
		case bodyLayerIdx <= 39: {
			return 'Band Check Shirt';
		}
		case bodyLayerIdx <= 43: {
			return 'Band Shirt Washed';
		}
		case bodyLayerIdx === 44: {
			return 'Band T-Chain';
		}
		case bodyLayerIdx <= 51: {
			return 'Super Check Shirt';
		}
		case bodyLayerIdx <= 55: {
			return 'Super Shirt Washed';
		}
		case bodyLayerIdx <= 56: {
			return 'Super T-Chain';
		}
		case bodyLayerIdx <= 62: {
			return 'Super Cape';
		}
		case bodyLayerIdx === 63: {
			return 'Puffer';
		}
		default: {
			return 'Hoodie';
		}
	}
};

const topColors: AttributeNameMap = {
	1: 'Lime',
	2: 'Sky',
	3: 'Bubblegum',
	4: 'Plum',
	5: 'Lemon',
	6: 'Sky',
	7: 'Lime',
	8: 'Orange',
	9: 'Bubblegum',
	10: 'Plum',
	11: 'Lime',
	12: 'Plum',
	13: 'Orange',
	14: 'Bubblegum',
	15: 'Sky',
	16: 'Plum',
	17: 'Sky',
	18: 'Lemon',
	19: 'Bubblegum',
	20: 'Lime',
	21: 'Sky',
	22: 'Lemon',
	23: 'Lime',
	24: 'Bubblegum',
	25: 'Plum',
	26: 'Black',
	27: 'Gray',
	28: 'Lemon',
	29: 'Lime',
	30: 'Silver',
	31: 'Snow',
	32: 'Sky',
	33: 'B_W',
	34: 'Brown',
	35: 'Lime',
	36: 'Orange',
	37: 'Plum',
	38: 'Red',
	39: 'Sky',
	40: 'Lavender',
	41: 'Rose',
	42: 'Sage',
	43: 'Taupe',
	44: 'Charcoal',
	45: 'B_W',
	46: 'Brown',
	47: 'Lime',
	48: 'Orange',
	49: 'Plum',
	50: 'Red',
	51: 'Sky',
	52: 'Lavender',
	53: 'Rose',
	54: 'Sage',
	55: 'Taupe',
	56: 'Black',
	57: 'Bubblegum',
	58: 'Lemon',
	59: 'Lime',
	60: 'Orange',
	61: 'Plum',
	62: 'Sky',
	63: 'Angelic White',
	64: 'Devilish Onyx'
};

export const getBodyLayerTraits = (bodyLayerIdx: number): PropertyTrait[] => {
	const topType = getTopTypeByBodyLayer(bodyLayerIdx);
	return [
		{
			trait_type: 'TOP',
			value: topType
		},
		{
			trait_type: topType.toUpperCase(),
			value: topColors[bodyLayerIdx]
		}
	];
};

export const getPropertiesTraits = (layersMap: Record<RobotLayer, string>): PropertyTrait[] => {
	const layersNames = Object.keys(layersMap) as RobotLayer[];

	return layersNames.reduce<PropertyTrait[]>((acc, layerName) => {
		const layerIdx = Number(layersMap[layerName]);

		if (layerName === 'LEGS') {
			const legsTraits = getLegsLayerTraits(layerIdx);

			return [...acc, ...legsTraits];
		}

		if (layerName === 'BODY') {
			const bodyTraits = getBodyLayerTraits(layerIdx);

			return [...acc, ...bodyTraits];
		}

		if (layerName in attributesNamesByLayer) {
			const attrNameByLayer = attributesNamesByLayer[layerName]!;

			const trait: PropertyTrait = {
				trait_type: layerName,
				value: attrNameByLayer[layerIdx]
			};

			return [...acc, trait];
		}

		return acc;
	}, []);
};
