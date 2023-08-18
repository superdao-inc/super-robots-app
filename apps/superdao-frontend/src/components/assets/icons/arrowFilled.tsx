import { Svg, SvgProps } from '../svg';

export const ArrowFilledIcon = (props: SvgProps) => (
	<Svg width="16" height="16" viewBox="0 0 16 16" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M8 14a1 1 0 001-1V5.463l3.283 3.377a1 1 0 001.434-1.394l-5-5.143a1 1 0 00-1.434 0l-5 5.143A1 1 0 103.717 8.84L7 5.463V13a1 1 0 001 1z"
			fill="fill"
		/>
	</Svg>
);
