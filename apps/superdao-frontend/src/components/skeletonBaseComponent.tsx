type SkeletonProps = {
	variant?: 'circular' | 'rectangular'; // TODO: add "text" variant if needed
	height?: number | string;
	width?: number | string;
	className?: string;
};

export const SkeletonComponent = (props: SkeletonProps) => {
	const { variant, height, width, className } = props;

	const baseClassname = 'animate-pulse bg-overlayTertiary';

	let variantClassname = '';
	switch (variant) {
		case 'circular': {
			variantClassname = 'rounded-full';
			break;
		}

		case 'rectangular':
		default:
			variantClassname = 'rounded-md';
	}

	const cn = [baseClassname, variantClassname, className].filter(Boolean).join(' ');

	return <div style={{ width, height }} className={cn} />;
};
