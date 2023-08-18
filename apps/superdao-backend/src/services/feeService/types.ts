export type GasStationResponse = {
	safeLow: {
		maxPriorityFee: number;
		maxFee: number;
	};
	standard: {
		maxPriorityFee: number;
		maxFee: number;
	};
	fast: {
		maxPriorityFee: number;
		maxFee: number;
	};
	estimatedBaseFee: number;
	blockTime: number;
	blockNumber: number;
};

export type Keys = 'safeLow' | 'standard' | 'fast';
