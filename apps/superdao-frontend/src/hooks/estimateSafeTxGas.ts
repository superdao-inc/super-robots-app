import { useCallback, useState } from 'react';

import { estimateGas } from 'src/services/gnosis/index';

export const useEstimateTxGas = ({ onSuccess, onError }: { onSuccess: Function; onError: Function }) => {
	const [isGasEstimationLoading, setIsLoading] = useState(false);

	const estimate = useCallback(
		async ({
			daoAddress,
			data,
			tokenAddress,
			amount,
			to
		}: {
			daoAddress: string;
			data: string;
			tokenAddress: string;
			amount?: string;
			to?: string;
		}): Promise<void> => {
			setIsLoading(true);

			try {
				const gas = await estimateGas({
					daoAddress,
					data,
					tokenAddress,
					amount,
					to
				});

				onSuccess(gas);
				setIsLoading(false);
			} catch (e) {
				setIsLoading(false);
				onError();
			}
		},
		[onSuccess, onError]
	);

	return [isGasEstimationLoading, estimate] as const;
};
