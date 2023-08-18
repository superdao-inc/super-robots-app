import { useState, useEffect } from 'react';
import { isBrowser } from 'src/utils/browser';

const getStorageValue = (key: string) => {
	if (isBrowser) {
		const item = localStorage.getItem(key);
		const initial = item ? JSON.parse(item) : null;
		return initial;
	}
};

export const useLocalStorage = (key: string) => {
	const [data, setData] = useState(() => {
		return getStorageValue(key);
	});

	useEffect(() => {
		if (data) {
			localStorage.setItem(key, JSON.stringify(data));
		}
	}, [data, setData, key]);

	return { data, setData };
};
