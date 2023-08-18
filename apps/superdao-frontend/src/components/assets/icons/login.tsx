import { Svg, SvgProps } from '../svg';

export const LoginIcon = (props: SvgProps) => (
	<Svg width="16" height="16" viewBox="0 0 16 16" {...props}>
		<g clipPath="url(#a)">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="m10.85 3.01.24.03c.44.03.66.1.82.18.37.19.68.5.87.87.08.16.15.38.18.82.04.45.04 1.03.04 1.89v2.4c0 .86 0 1.44-.04 1.89-.03.44-.1.66-.18.82a2 2 0 0 1-.87.87c-.16.08-.38.15-.82.18l-.24.03-.65.01H10a1 1 0 1 0 0 2h.88l.37-.04a4.09 4.09 0 0 0 1.57-.4 4 4 0 0 0 1.74-1.74c.25-.49.35-1 .4-1.57.04-.54.04-1.2.04-2v-2.5c0-.8 0-1.46-.04-2a4.09 4.09 0 0 0-.4-1.57 4 4 0 0 0-1.74-1.74c-.49-.25-1-.35-1.57-.4l-.37-.03-.64-.01H10a1 1 0 1 0 0 2h.2l.65.01ZM5.96 5.37a1 1 0 0 1 1.41-1.41l3.34 3.33a1 1 0 0 1 0 1.42l-3.34 3.33a1 1 0 0 1-1.41-1.41L7.59 9H2a1 1 0 1 1 0-2h5.59L5.96 5.37Z"
				fill="#fff"
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h16v16H0z" />
			</clipPath>
		</defs>
	</Svg>
);
