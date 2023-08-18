import { Svg, SvgProps } from '../svg';

export const CrossThinIcon = (props: SvgProps) => (
	<Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
		<g clipPath="url(#a)">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4.54 4.54a1 1 0 0 1 1.42 0L12 10.6l6.04-6.05a1 1 0 1 1 1.42 1.42L13.4 12l6.05 6.04a1 1 0 0 1-1.42 1.42L12 13.4l-6.04 6.05a1 1 0 0 1-1.42-1.42L10.6 12 4.54 5.96a1 1 0 0 1 0-1.42Z"
				fill="#71747A"
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</Svg>
);
