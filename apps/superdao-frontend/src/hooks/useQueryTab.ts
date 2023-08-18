import { NextRouter, useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { isString } from '@sd/superdao-shared';

export const useQueryTab = <T extends string>(
	defaultValue: T,
	queryKey = 'tab' as T
): [T, (tab: T) => Promise<void>] => {
	const router = useRouter();
	const [currentTab, setCurrentTab] = useState<T>(defaultValue);

	const showTab = useCallback(
		async (tab: T) => {
			const pushSuccess = await updateQueryParam(router, queryKey, tab);
			if (pushSuccess || currentTab !== tab) setCurrentTab(tab);
		},
		[queryKey, router, currentTab]
	);

	useEffect(() => {
		const valueInUrl = router.query[queryKey] as T;
		showTab(isString(valueInUrl) ? valueInUrl : defaultValue);
	}, [router.query, queryKey, defaultValue, router, showTab]);

	return useMemo(() => [currentTab, showTab], [currentTab, showTab]);
};

const updateQueryParam = async (router: NextRouter, key: string, value?: string): Promise<boolean> => {
	const currentQuery = router.query;
	if (currentQuery[key] == value) return false;

	currentQuery[key] = value;

	return router.replace(
		{
			pathname: router.pathname,
			query: router.query
		},
		undefined,
		{ shallow: true }
	);
};
