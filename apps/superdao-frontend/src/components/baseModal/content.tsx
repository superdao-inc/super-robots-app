import { HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

type Props = {
	children: ReactNode;
	withFooter?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const ModalContent = (props: Props) => {
	const { children, withFooter = true, className, ...rest } = props;
	return (
		<div
			className={cn(
				'p-8',
				{
					'max-h-[calc(100vh-40px-72px)]': withFooter,
					'mb-[72px]': withFooter
				},
				className
			)}
			{...rest}
		>
			{children}
		</div>
	);
};

export { ModalContent };
