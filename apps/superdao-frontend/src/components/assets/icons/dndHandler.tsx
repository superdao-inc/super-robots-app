import { Svg, SvgProps } from '../svg';

export const DnDHandler = (props: SvgProps) => (
	<Svg width={20} height={20} viewBox="0 0 20 20" {...props}>
		<g clipPath="url(#a)">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M1.664 7.5c0-.46.373-.833.833-.833h15a.833.833 0 0 1 0 1.666h-15a.833.833 0 0 1-.833-.833Zm0 5c0-.46.373-.834.833-.834h15a.833.833 0 0 1 0 1.667h-15a.833.833 0 0 1-.833-.833Z"
				fill="#465065"
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h20v20H0z" />
			</clipPath>
		</defs>
	</Svg>
);
