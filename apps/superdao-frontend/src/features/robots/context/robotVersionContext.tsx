import { createContext, PropsWithChildren, useContext } from 'react';

type ContextValue = {
	isUsingOddVersion: boolean;
};

const RobotVersionContext = createContext<ContextValue | null>(null);

type Props = PropsWithChildren<{ isUsingOddVersion: boolean }>;

export const RobotVersionContextProvider = ({ isUsingOddVersion, children }: Props) => {
	const value = {
		isUsingOddVersion
	};

	return <RobotVersionContext.Provider value={value}>{children}</RobotVersionContext.Provider>;
};

export const useRobotVersionContext = (): ContextValue => {
	const context = useContext(RobotVersionContext);

	if (!context) throw new Error('"useRobotVersionContext" can not be used outside "RobotVersionContextProvider"');

	return context;
};
