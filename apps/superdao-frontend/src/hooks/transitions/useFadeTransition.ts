import { useMountTransition } from './useMountTransition';

export const useFadeTransition = (isMounted: boolean, unmountDelay: number, mountDelay: number = 0) => {
	const hasTransitionedIn = useMountTransition(isMounted, unmountDelay, mountDelay);

	return {
		styles: {
			'!opacity-100': hasTransitionedIn,
			'!opacity-0': !isMounted
		},
		shouldShowEl: isMounted || hasTransitionedIn
	};
};

export const useFadeWithTranslateTransition = (isMounted: boolean, unmountDelay: number, mountDelay: number = 0) => {
	const hasTransitionedIn = useMountTransition(isMounted, unmountDelay, mountDelay);

	return {
		styles: {
			'!opacity-100 !translate-y-0': hasTransitionedIn,
			'!opacity-0 !translate-y-3': !isMounted
		},
		shouldShowEl: isMounted || hasTransitionedIn
	};
};
