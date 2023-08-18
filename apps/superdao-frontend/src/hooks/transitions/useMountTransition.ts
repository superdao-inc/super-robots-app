import { useEffect, useState } from 'react';

export const useMountTransition = (isMounted: boolean, unmountDelay: number, mountDelay: number = 0) => {
	const [hasTransitionedIn, setHasTransitionedIn] = useState(false);

	useEffect(() => {
		let mountTimeoutId: ReturnType<typeof setTimeout>;
		let unmountTimeoutId: ReturnType<typeof setTimeout>;

		if (isMounted && !hasTransitionedIn) {
			//mount delay is assumed tto be 0 for next-tick state update, but can be overrided
			mountTimeoutId = setTimeout(() => setHasTransitionedIn(true), mountDelay);
		} else if (!isMounted && hasTransitionedIn) {
			unmountTimeoutId = setTimeout(() => setHasTransitionedIn(false), unmountDelay);
		}

		return () => {
			clearTimeout(mountTimeoutId);
			clearTimeout(unmountTimeoutId);
		};
	}, [unmountDelay, mountDelay, isMounted, hasTransitionedIn]);

	return hasTransitionedIn;
};
