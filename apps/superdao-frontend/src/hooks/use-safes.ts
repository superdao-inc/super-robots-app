import { useCallback, useEffect, useState } from 'react';
import { useGetSafesList } from './get-safes';

type SafesResponse = {
	address: string;
	ownersCount: number;
	confirmators: number;
	chainId?: number;
};

export const useSafesList = (walletAddress: string, onError: () => void = () => {}) => {
	const [isLoading, getSafesList] = useGetSafesList({ onError });

	const [safes, setSafes] = useState<SafesResponse[]>([]);

	const fetchSafes = useCallback(async () => {
		const data = await getSafesList(walletAddress, []);
		setSafes(data);
	}, [getSafesList, walletAddress]);

	useEffect(() => {
		fetchSafes();
	}, [fetchSafes]);

	return { safes, isLoading };
};
