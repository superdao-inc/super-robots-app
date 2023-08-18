import { useCallback, useEffect, useRef } from 'react';

/**
 * @link github.com/streamich/react-use/blob/master/docs/useMountedState.md
 */
export const useMountedState = (): (() => boolean) => {
	const mountedRef = useRef(false);

	useEffect(() => {
		mountedRef.current = true;

		return () => {
			mountedRef.current = false;
		};
	}, []);

	return useCallback(() => mountedRef.current, []);
};
