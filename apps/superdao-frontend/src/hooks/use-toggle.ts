import { useState } from 'react';

export const useToggle = (initialValue = false) => {
	const [value, setValue] = useState<boolean>(initialValue);

	const toggle = () => {
		setValue((v) => !v);
	};

	return [value, toggle] as const;
};
