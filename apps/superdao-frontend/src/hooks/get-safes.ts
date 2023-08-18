import { useCallback, useState } from 'react';

import { getAllChainSafes } from 'src/services/gnosis/index';

type SafesResponse = {
	address: string;
	ownersCount: number;
	confirmators: number;
};

type Props = {
	onError: () => void;
};

export const useGetSafesList = ({ onError }: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const getSafesList = useCallback(
		async (address: string, excludeAddresses: (string | null)[]): Promise<SafesResponse[]> => {
			setIsLoading(true);
			try {
				const safes = await getAllChainSafes(address, excludeAddresses);
				setIsLoading(false);

				return safes;
			} catch (e) {
				setIsError(true);
				setIsLoading(false);
				onError();
				return [];
			}
		},
		[onError]
	);

	return [isLoading, getSafesList, isError] as const;
};
