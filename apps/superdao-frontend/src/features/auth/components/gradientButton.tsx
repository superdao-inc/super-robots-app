import cn from 'classnames';

import { forwardRef } from 'react';
import { Button } from 'src/components';
import { WithChildren } from 'src/types/type.utils';

type Props = { onClick: () => void; isLoading?: boolean; className?: string };

export const GradientButton = forwardRef<HTMLButtonElement, WithChildren<Props>>((props, ref) => {
	const { onClick, isLoading, className, children } = props;
	return (
		<Button
			className={cn(
				className,
				'w-full rounded-2xl py-4 px-6',
				'btn-gradient shadow-[0_5.43046px_60px_rgba(229,99,88,0.4)] transition-all hover:shadow-[0_5.43046px_60px_rgba(229,99,88,0.6)]'
			)}
			size="lg"
			color="accentPrimary"
			onClick={onClick}
			isLoading={isLoading}
			ref={ref}
		>
			{children}
		</Button>
	);
});

GradientButton.displayName = 'GradientButton';
