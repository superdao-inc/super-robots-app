import { SvgProps, Svg } from '../svg';

export const OutlineTreasuryIcon = (props: SvgProps) => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
			<g clipPath="url(#a)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M6.14 2c-.78 0-1.51.36-1.98.97L.68 7.5a2 2 0 0 0 0 2.44L10.8 23.1c.6.78 1.78.78 2.38 0L23.32 9.93a2 2 0 0 0 0-2.44l-3.48-4.52A2.5 2.5 0 0 0 17.86 2H6.14Zm-.4 2.2a.5.5 0 0 1 .4-.2h11.72c.16 0 .3.07.4.2L21.19 8H2.8l2.93-3.8ZM3.25 10 12 21.36 20.75 10H3.25Z"
					fill="#A2A8B4"
				/>
			</g>
			<defs>
				<clipPath id="a">
					<path fill="#fff" d="M0 0h24v24H0z" />
				</clipPath>
			</defs>
		</Svg>
	);
};
