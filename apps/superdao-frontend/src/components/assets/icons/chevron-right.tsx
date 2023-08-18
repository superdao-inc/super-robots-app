import { Svg, SvgProps } from '../svg';

export const ChevronRight = (props: SvgProps) => {
	const { width = 6, height = 12, ...restProps } = props;
	return (
		<Svg width={width} height={height} viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...restProps}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M.532 11.586a.75.75 0 0 1-.118-1.055L4.04 6 .414 1.468A.75.75 0 1 1 1.586.531l4 5a.75.75 0 0 1 0 .937l-4 5a.75.75 0 0 1-1.054.118Z"
				fill={props?.color || '#717A8C'}
			/>
		</Svg>
	);
};
