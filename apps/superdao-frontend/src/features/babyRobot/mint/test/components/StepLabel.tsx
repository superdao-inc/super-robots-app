import cn from 'classnames';

type Props = {
	title: string;
	stepNumber: string;
	isActive: boolean;
	className?: string;
};

export const StepLabel = ({ title, stepNumber, isActive, className }: Props) => {
	return (
		<div
			className={cn(
				'mb-5 flex font-normal leading-7 transition-all',
				isActive ? 'text-foregroundPrimary' : 'text-foregroundTertiary',
				className
			)}
		>
			<div
				className={cn(
					'bg-overlaySecondary mr-4 h-7 w-7 rounded-full text-center text-[17px]',
					isActive ? 'text-tintCyan bg-cyan-500/15' : 'text-foregroundTertiary'
				)}
			>
				{stepNumber}
			</div>
			{title}
		</div>
	);
};
