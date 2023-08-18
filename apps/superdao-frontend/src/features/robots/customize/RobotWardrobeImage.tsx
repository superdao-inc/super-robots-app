import { useState } from 'react';
import cn from 'classnames';

import { Loader } from 'src/components';

type Props = {
	src: string;
};

export const RobotWardrobeImage = (props: Props) => {
	const { src } = props;

	const [isLoading, setIsLoading] = useState(true);

	const handleImageLoaded = () => {
		setIsLoading(false);
	};

	return (
		<>
			<Loader size="sm" className={cn({ hidden: !isLoading })} />
			<img onLoad={handleImageLoaded} className={cn('h-full w-full', { hidden: isLoading })} src={src} />
		</>
	);
};
