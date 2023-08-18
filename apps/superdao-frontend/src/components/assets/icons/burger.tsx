import { Svg, SvgProps } from '../svg';

export const BurgerIcon = (props: SvgProps) => (
	<Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M5 4.25a1.25 1.25 0 1 0 0 2.5h14a1.25 1.25 0 1 0 0-2.5H5ZM3.75 12c0-.69.56-1.25 1.25-1.25h14a1.25 1.25 0 1 1 0 2.5H5c-.69 0-1.25-.56-1.25-1.25Zm0 6.5c0-.69.56-1.25 1.25-1.25h14a1.25 1.25 0 1 1 0 2.5H5c-.69 0-1.25-.56-1.25-1.25Z"
			fill="fill"
		/>
	</Svg>
);
