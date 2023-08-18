import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';

export const useQueryEffect = (key: string, effect: () => void, alternate?: () => void) => {
	const router = useRouter();

	const target = router.query[key];

	useEffect(() => {
		if (target) {
			effect();
			removeQueryParams(router, [key]);
		} else {
			alternate?.();
		}
	}, [alternate, effect, key, router, target]);
};

const removeQueryParams = (router: NextRouter, paramsToRemove: Array<string> = []) => {
	const currentQuery = router.query;
	if (paramsToRemove.length > 0) {
		paramsToRemove.forEach((param) => delete currentQuery[param]);
	} else {
		Object.keys(router.query).forEach((param) => delete currentQuery[param]);
	}
	router.replace(
		{
			pathname: router.pathname,
			query: router.query
		},
		undefined,
		{ shallow: true }
	);
};
