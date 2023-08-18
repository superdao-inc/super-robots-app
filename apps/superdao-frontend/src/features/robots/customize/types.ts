export type CustomItemByTokenType = {
	id: string;
	isEnabled: boolean;
	customItem: {
		layerName: string;
		layerType: string;
	};
} | null;
