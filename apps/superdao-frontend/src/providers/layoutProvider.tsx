import React, { createContext, useContext } from 'react';
import { useSwitch } from 'src/hooks';

type ContextType = ReturnType<typeof useSwitch>;

const LayoutContext = createContext<ContextType>([
	false,
	{
		on: () => {},
		off: () => {},
		toggle: () => {}
	}
]);

export const useLayoutContext = () => {
	const context = useContext(LayoutContext);

	if (!context) throw new Error('useLayoutContext must be used within a LayoutProvider');

	return context;
};

type Props = {
	children?: React.ReactNode;
};

export const LayoutProvider: React.FC<Props> = ({ children }) => {
	return <LayoutContext.Provider value={useSwitch(false)}>{children}</LayoutContext.Provider>;
};
