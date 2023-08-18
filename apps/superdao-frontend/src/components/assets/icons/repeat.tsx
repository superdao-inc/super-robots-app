import { Svg, SvgProps } from '../svg';

export const RepeatIcon = (props: SvgProps) => (
	<Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
		<g clipPath="url(#a)">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 4a8 8 0 0 0-7.8 6.22 1 1 0 1 1-1.95-.44A10 10 0 0 1 20 6V3.25a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1h-5a1 1 0 1 1 0-2h2.44A7.99 7.99 0 0 0 12 4Zm9 9.02a1 1 0 0 1 .75 1.2A10 10 0 0 1 4 18v2.75a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2H5.56a7.99 7.99 0 0 0 14.24-2.97 1 1 0 0 1 1.2-.76Z"
				fill="#FC7900"
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</Svg>
);
