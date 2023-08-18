const baseLayersMap = [
	['audience:early_adopters', 'layer-scene-crypto'],
	['audience:developers', 'layer-scene-programming'],
	['audience:culture', 'layer-scene-culture'],
	['audience:gaming', 'layer-scene-gaming'],
	['audience:defi', 'layer-scene-defi'],
	['base:random1', 'layer-scene-random1'],
	['base:random2', 'layer-scene-random2'],
	['base:random3', 'layer-scene-random3'],
	['base:random4', 'layer-scene-random4']
];

const interestGamingMap = [['interest:gaming', 'layer-interest-gaming']];
const interestDefiMap = [['interest:defi', 'layer-interest-defi']];
const interestProgrammingMap = [['interest:programming', 'layer-interest-programming']];
const interestCultureMap = [['interest:culture', 'layer-interest-culture']];
const robotMap = [['base:robot', 'layer-robot-base']];

const interestGetter = (vectorTag: string, baseTag: string) => {
	return (vector: { [key: string]: boolean }, _hash: number, layers: string[][]) => {
		if (!Number(vector[vectorTag])) {
			return 0;
		}
		return layers.find(([k]) => k === baseTag) ? 0 : 1;
	};
};

export const layersMeta = [
	{
		digits: 4,
		order: 0,
		names: baseLayersMap,
		getter: (vector: { [key: string]: boolean }, hash: number) => {
			// possible layer variants must be less than 2^digits
			let layerTag: string | null = null;
			let options = [
				'audience:early_adopters',
				'audience:developers',
				'audience:culture',
				'audience:gaming',
				'audience:defi'
			].filter((i) => vector[i]);
			if (options.length) {
				const key = options[hash % options.length];
				layerTag = key;
			} else {
				const randomLayers = ['base:random1', 'base:random2', 'base:random3', 'base:random4'];
				layerTag = randomLayers[hash % randomLayers.length];
			}
			return baseLayersMap.findIndex(([tag]) => tag === layerTag) + 1;
		}
	}, // base layer
	{ digits: 1, order: 1, names: interestGamingMap, getter: interestGetter('interest:gaming', 'audience:gaming') },
	{ digits: 1, order: 2, names: interestDefiMap, getter: interestGetter('interest:defi', 'audience:defi') },
	{
		digits: 1,
		order: 3,
		names: interestProgrammingMap,
		getter: interestGetter('interest:programming', 'audience:developers')
	},
	{ digits: 1, order: 4, names: interestCultureMap, getter: interestGetter('interest:culture', 'audience:culture') },
	{ digits: 1, order: 5, names: robotMap, getter: () => 1 }
]; // orderby order
