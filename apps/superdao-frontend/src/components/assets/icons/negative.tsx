import { Svg, SvgProps } from '../svg';

export const NegativeIcon = (props: SvgProps) => (
	<Svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<g clipPath="url(#a)">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M2.164 8c0-.46.373-.833.833-.833h10a.833.833 0 0 1 0 1.666h-10A.833.833 0 0 1 2.164 8Z"
				fill="#A2A8B4"
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h16v16H0z" />
			</clipPath>
		</defs>
	</Svg>
);

export default NegativeIcon;
