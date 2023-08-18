import { Svg, SvgProps } from '../svg';

export const FireIcon = (props: SvgProps) => {
	const { width, height, ...restProps } = props;
	return (
		<Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" {...restProps}>
			<path
				fill="url(#fireicon)"
				fillRule="evenodd"
				d="M7.45.41a.652.652 0 0 0-.988-.285C4.402 1.623 4.146 3.786 4.366 5.46c.072.546.195 1.052.327 1.485-.322-.33-.599-.791-.833-1.338a9.197 9.197 0 0 1-.474-1.462 9.584 9.584 0 0 1-.126-.615L3.255 3.5v-.007a.652.652 0 0 0-1.091-.384l.445.476a48.059 48.059 0 0 0-.446-.475v.001l-.003.002-.007.007a2.517 2.517 0 0 0-.1.099 8.136 8.136 0 0 0-1.007 1.309C.509 5.399-.042 6.666.004 8.166.09 11.079 2.494 14.5 6.193 14.5c3.644 0 6.191-2.76 6.191-6.354 0-1.913-1.075-3.138-2.146-4.208-.136-.137-.273-.272-.41-.405C8.872 2.59 7.968 1.7 7.45.41Z"
				clipRule="evenodd"
			/>
			<defs>
				<linearGradient id="fireicon" x1="0" x2="14.322" y1="0" y2="12.232" gradientUnits="userSpaceOnUse">
					<stop stop-color="#F63" />
					<stop offset="1" stop-color="#E62E5C" />
				</linearGradient>
			</defs>
		</Svg>
	);
};
