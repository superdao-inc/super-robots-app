import { Svg, SvgProps } from '../svg';

export const WebIcon = (props: SvgProps) => (
	<Svg width={16} height={16} viewBox="0 0 16 16" fill="#A2A8B4" {...props}>
		<g clip-path="url(#a)">
			<path
				d="M8 1.5h.31a25.97 25.97 0 0 1 .74 2.67h-2.1A25.02 25.02 0 0 1 7.7 1.5L8 1.5ZM4.57 4.17H2.75A6.53 6.53 0 0 1 5.04 2.2c-.17.59-.33 1.25-.47 1.96ZM1.5 8c0-.52.06-1.02.17-1.5h2.56a17.27 17.27 0 0 0 0 3H1.67A6.52 6.52 0 0 1 1.5 8Zm3.54 5.79a6.53 6.53 0 0 1-2.29-1.96h1.82c.14.71.3 1.37.47 1.96ZM8 14.5h-.31a25.98 25.98 0 0 1-.74-2.67h2.1a25 25 0 0 1-.74 2.66L8 14.5Zm3.43-2.67h1.82a6.53 6.53 0 0 1-2.29 1.96c.17-.59.33-1.25.47-1.96ZM14.5 8c0 .52-.06 1.02-.17 1.5h-2.56a17.25 17.25 0 0 0 0-3h2.56c.11.48.17.98.17 1.5Zm-3.07-3.83c-.14-.71-.3-1.37-.47-1.96.91.47 1.7 1.14 2.29 1.96h-1.82ZM6.5 8c0-.5.03-1 .08-1.5h2.84a15.2 15.2 0 0 1 0 3H6.58C6.53 9 6.5 8.5 6.5 8Z"
				fill="fill"
				stroke="#A2A8B4"
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h16v16H0z" />
			</clipPath>
		</defs>
	</Svg>
);