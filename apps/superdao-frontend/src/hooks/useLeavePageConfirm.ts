import { useEffect, useCallback } from 'react';
import Router from 'next/router';

// https://github.com/streamich/react-use/blob/master/src/useBeforeUnload.ts
const useBeforeUnload = (enabled: boolean | (() => boolean) = true, message?: string) => {
	const handler = useCallback(
		(event: BeforeUnloadEvent) => {
			const finalEnabled = typeof enabled === 'function' ? enabled() : true;

			if (!finalEnabled) return;

			event.preventDefault();

			if (message) event.returnValue = message;

			return message;
		},
		[enabled, message]
	);

	useEffect(() => {
		if (!enabled) return;

		window.addEventListener('beforeunload', handler);

		return () => window.removeEventListener('beforeunload', handler);
	}, [enabled, handler]);
};

// https://github.com/vercel/next.js/discussions/9662#discussioncomment-511835
export const useLeavePageConfirm = (isConfirm = true, message = 'Are you sure want to leave this page?') => {
	useBeforeUnload(isConfirm, message);

	useEffect(() => {
		const handler = () => {
			// eslint-disable-next-line no-alert
			if (isConfirm && !window.confirm(message)) {
				// eslint-disable-next-line no-throw-literal
				throw 'Route Canceled';
			}
		};

		Router.events.on('routeChangeStart', handler);

		return () => {
			Router.events.off('routeChangeStart', handler);
		};
	}, [isConfirm, message]);
};
