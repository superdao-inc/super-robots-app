import { useCallback, useState } from 'react';

import { sendFund, TxData } from 'src/services/gnosis/index';

type Props = {
	onSuccess: (txData: TxData) => void;
	onError: Function;
};

type TxProps = {
	daoAddress: string;
	recipient: string;
	data: string;
	senderAddress: string;
	chainId: number;
	tokenAddress: string | null;
	amount?: string;
};

export const useTransferTransaction = ({ onSuccess, onError }: Props) => {
	const [isLoading, setIsLoading] = useState(false);

	const transfer = useCallback(
		async ({ daoAddress, recipient, data, senderAddress, chainId, tokenAddress, amount }: TxProps): Promise<void> => {
			setIsLoading(true);

			try {
				const txData = await sendFund({
					daoAddress,
					to: recipient,
					data,
					senderAddress,
					chainId,
					tokenAddress,
					amount
				});

				if (txData) onSuccess(txData);

				setIsLoading(false);
			} catch (e) {
				setIsLoading(false);
				onError();
			}
		},
		[onSuccess, onError]
	);

	return [isLoading, transfer] as const;
};
