import { Router, useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

type RouterChangeParams = {
	shallow: boolean;
};

export function useConfirmOnUnload(
	message: string | false,
	options?: { disableRouteChangeWarning?: boolean; enableRouteChange?: boolean }
) {
	const [routeChangeDetected, setRouteChangeDetected] = useState(false);

	const router = useRouter();

	const reset = useCallback(() => {
		setRouteChangeDetected(false);
	}, []);

	useEffect(() => {
		const onBeforeUnload = (event: BeforeUnloadEvent) => {
			if (message) {
				event.preventDefault();

				event.returnValue = message;

				return message;
			}
		};

		const onRouterChangeStart = (url: string, { shallow }: RouterChangeParams) => {
			if (
				message &&
				router.asPath !== url &&
				!shallow &&
				(options?.disableRouteChangeWarning || !window.confirm(message)) &&
				!options?.enableRouteChange
			) {
				Router.events.emit('routeChangeError');
				router.replace(router.asPath);
				setRouteChangeDetected(true);
				throw 'routeChange aborted. This error can be safely ignored - https://github.com/zeit/next.js/issues/2476.';
			}
		};

		window.addEventListener('beforeunload', onBeforeUnload);
		router.events.on('routeChangeStart', onRouterChangeStart);

		return () => {
			window.removeEventListener('beforeunload', onBeforeUnload);
			router.events.off('routeChangeStart', onRouterChangeStart);
		};
	}, [message, router, options]);
	return { routeChangeDetected, reset };
}
