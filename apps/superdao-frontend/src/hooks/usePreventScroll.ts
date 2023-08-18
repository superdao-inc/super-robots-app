import { ForwardedRef, useEffect } from 'react';

const preventScroll: EventListener = (e) => {
	e.preventDefault();
	return false;
};

export const usePreventScroll = <T extends HTMLElement>(shouldPreventScroll: boolean, el: ForwardedRef<T> | null) => {
	useEffect(() => {
		if (typeof el === 'function' || !el?.current) return;

		const removeListener = () => {
			el?.current?.removeEventListener('touchmove', preventScroll);
		};

		if (shouldPreventScroll) {
			el?.current?.addEventListener('touchmove', preventScroll, { passive: false });
		} else {
			removeListener();
		}

		return removeListener;
	}, [el, shouldPreventScroll]);
};
