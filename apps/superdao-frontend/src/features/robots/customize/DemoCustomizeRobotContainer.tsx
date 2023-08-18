import { useState } from 'react';
import { CustomizeRobot } from './CustomizeRobot';

type Props = {
	isUsingOddVersion: boolean;
	imageName: string;
};

export const DemoCustomizeRobotContainer = (props: Props) => {
	const { isUsingOddVersion, imageName } = props;

	const [subShop, setSubShop] = useState<string | null>(null);

	const handleSelectSubShop = (shop: string) => {
		setSubShop(shop);
	};

	const handleResetSubShop = () => {
		setSubShop(null);
	};

	return (
		<CustomizeRobot
			isDemo
			onResetSubShop={handleResetSubShop}
			subShop={subShop}
			onSelectSubShop={handleSelectSubShop}
			imageName={imageName}
			isUsingOddVersion={isUsingOddVersion}
		/>
	);
};
