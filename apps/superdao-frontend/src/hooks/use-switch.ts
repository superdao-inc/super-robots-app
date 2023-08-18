import { useMemo, useState } from 'react';

type SwitchHelpers = Record<'on' | 'off' | 'toggle', () => void>;

type UseSwitch = (defaultValue: boolean) => [boolean, SwitchHelpers];

export const useSwitch: UseSwitch = (defaultValue = false) => {
	const [isOn, setIsOn] = useState(defaultValue);

	const actions = useMemo(
		() => ({
			on: () => setIsOn(true),
			off: () => setIsOn(false),
			toggle: () => setIsOn((v) => !v)
		}),
		[]
	);

	return [isOn, actions];
};
