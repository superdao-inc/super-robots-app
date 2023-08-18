import { Svg, SvgProps } from '../svg';

export const AddBoldIcon = (props: SvgProps) => (
	<Svg width={18} height={18} viewBox="0 0 18 18" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M9 .25c.69 0 1.25.56 1.25 1.25v6.25h6.25a1.25 1.25 0 1 1 0 2.5h-6.25v6.25a1.25 1.25 0 1 1-2.5 0v-6.25H1.5a1.25 1.25 0 1 1 0-2.5h6.25V1.5C7.75.81 8.31.25 9 .25Z"
			fill={props.fill || '#A2A8B4'}
		/>
	</Svg>
);
