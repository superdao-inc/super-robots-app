import { RefObject, useCallback, useEffect, useState } from 'react';

export const useRect = <T extends HTMLElement>(ref: RefObject<T>) => {
	const [rect, setRect] = useState(getRect(ref ? ref.current : null));

	const handleResize = useCallback(() => {
		if (!ref.current) return;

		setRect(getRect(ref.current));
	}, [ref]);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [handleResize, ref]);

	return rect;
};

const EMPTY_DOM_RECT: DOMRect = {
	bottom: 0,
	height: 0,
	left: 0,
	right: 0,
	top: 0,
	width: 0,
	x: 0,
	y: 0,
	toJSON: () => {}
};

function getRect<T extends HTMLElement>(element: T | null): DOMRect {
	return element ? element.getBoundingClientRect() : EMPTY_DOM_RECT;
}
