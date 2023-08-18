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

/**
 * Gas schedule
 * https://docs.infura.io/infura/features/itx-transactions#gas-price-escalation-schedules
 */
export type InfuraTxSchedule = 'fast' | 'slow';

export type InfuraTransaction = {
	// Address of the contract we want to call
	to: string;

	// Encoded data payload representing the contract method call
	data: string;

	// An upper limit on the gas we're willing to spend
	gas: string;

	schedule: InfuraTxSchedule;
};

export type InfuraTransactionResponse = {
	// The transaction hash
	relayTransactionHash: string;
};

export type RelayTransactionStatusResponse = {
	receivedTime: string;
	broadcasts?: [{ broadcastTime: string; ethTxHash: string; gasPrice: string }];
};
