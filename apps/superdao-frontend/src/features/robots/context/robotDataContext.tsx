import { createContext, PropsWithChildren, useContext } from 'react';

type ContextValue = {
	tokenId: string;
	protocol: string;
	hostname: string;
};

const RobotDataContext = createContext<ContextValue | null>(null);

type Props = PropsWithChildren<ContextValue>;

export const RobotDataContextProvider = (props: Props) => {
	const { children, ...value } = props;

	return <RobotDataContext.Provider value={value}>{children}</RobotDataContext.Provider>;
};

export const useRobotDataContext = (): ContextValue => {
	const context = useContext(RobotDataContext);

	if (!context) throw new Error('"useRobotDataContext" can not be used outside "RobotVersionContextProvider"');

	return context;
};
