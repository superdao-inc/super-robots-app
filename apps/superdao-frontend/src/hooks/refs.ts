import React from 'react';

export function useCombinedRefs<T>(...refs: React.ForwardedRef<any>[]): React.MutableRefObject<T> {
	const targetRef = React.useRef();

	React.useEffect(() => {
		refs.forEach((ref) => {
			if (!ref) return;

			if (typeof ref === 'function') {
				ref(targetRef.current);
			} else {
				// eslint-disable-next-line no-param-reassign
				ref.current = targetRef.current;
			}
		});
	}, [refs]);

	return targetRef as any;
}
