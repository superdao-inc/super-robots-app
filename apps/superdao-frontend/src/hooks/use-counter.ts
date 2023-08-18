import { useState } from 'react';

type Props = {
	min?: number;
	max?: number;
	defaultValue?: number;
};

export const useCount = (props?: Props) => {
	const { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER, defaultValue = 0 } = props || {};
	const [count, setCount] = useState(defaultValue);

	const increment = () => {
		if (count < max) setCount((prev) => prev + 1);
	};

	const decrement = () => {
		if (count > min) setCount((prev) => prev - 1);
	};

	const reset = () => {
		setCount(defaultValue);
	};

	return { count, increment, decrement, reset };
};
