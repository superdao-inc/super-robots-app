import { ReactNode } from 'react';
import cn from 'classnames';

import { useLayoutContext } from 'src/providers/layoutProvider';
import { ArrowLeftIcon, BurgerIcon } from './assets/icons';
import { Title1 } from './text';

type Props = {
	title?: string | ReactNode;
	className?: string;
	burgerClassName?: string;
	onBack?: () => void;
	withBurger?: boolean;
	right?: ReactNode;
};

export const MobileHeader = (props: Props) => {
	const { title = null, onBack, className, burgerClassName, withBurger, right = null } = props;
	const [_, { on: openNavigation }] = useLayoutContext();

	return (
		<div className={cn('bg-backgroundPrimary z-1 sticky top-0 flex items-center gap-4 py-3 lg:hidden', className)}>
			{withBurger && (
				<BurgerIcon className={cn('cursor-pointer', burgerClassName)} width={24} height={24} onClick={openNavigation} />
			)}

			{!withBurger && onBack && <ArrowLeftIcon className="cursor-pointer" width={24} height={24} onClick={onBack} />}

			{typeof title === 'string' ? <Title1 className="flex grow items-center truncate">{title}</Title1> : title}

			{right}
		</div>
	);
};
