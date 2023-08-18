import { useState } from 'react';

import { deployNewSafe } from 'src/services/gnosis/index';

type ResponseProps = {
	safeAddress: string | null;
	txHash: string | null;
};

type Props = {
	onError: (e: any) => void;
};

export const useDeploySafe = ({ onError }: Props) => {
	const [isSafeLoading, setIsLoading] = useState(false);

	const createSafe = async (owners: string[], threshold: number): Promise<ResponseProps> => {
		setIsLoading(true);
		try {
			const safeData = await deployNewSafe({ owners, threshold });

			return safeData;
		} catch (e) {
			setIsLoading(false);

			onError(e);
			return {
				txHash: null,
				safeAddress: null
			};
		}
	};

	return [createSafe, isSafeLoading] as const;
};
