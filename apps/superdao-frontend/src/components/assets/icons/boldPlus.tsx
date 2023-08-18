import { Svg, SvgProps } from '../svg';

export const BoldPlusIcon = (props: SvgProps) => {
	return (
		<Svg width={20} height={20} fill="#717A8C" viewBox="0 0 20 20" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M10 3.13c.69 0 1.25.55 1.25 1.25v4.37h4.38a1.25 1.25 0 1 1 0 2.5h-4.38v4.38a1.25 1.25 0 1 1-2.5 0v-4.38H4.37a1.25 1.25 0 1 1 0-2.5h4.38V4.37c0-.69.56-1.25 1.25-1.25Z"
				fill="fill"
			/>
		</Svg>
	);
};
