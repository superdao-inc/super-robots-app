import { Svg, SvgProps } from '../svg';

export const GiftActiveIcon = (props: SvgProps) => (
	<Svg width={36} height={36} viewBox="0 0 36 36" {...props}>
		<rect y=".5" width="36" height="36" rx="8" fill="#FC7900" fillOpacity=".12" />
		<g clipPath="url(#a)">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M9 20v5.5a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V20h1a1 1 0 0 0 1-1v-3.5a3 3 0 0 0-3-3h-2.38a3.5 3.5 0 0 0-5.57-4c-.63-.62-1.49-1-2.43-1a3.5 3.5 0 0 0-3.14 5H10a3 3 0 0 0-3 3V19a1 1 0 0 0 1 1h1Zm10-5.5V18h8v-2.5a1 1 0 0 0-1-1h-7Zm6 5.5h-6v7.5h4a2 2 0 0 0 2-2V20Zm-8 0h-6v5.5c0 1.1.9 2 2 2h4V20Zm0-2v-3.5h-7a1 1 0 0 0-1 1V18h8Zm-1.35-5.5H17v-1.52l.03-.45c-.2-.6-.75-1.03-1.41-1.03a1.5 1.5 0 0 0-1.32 2.16c.26.52.78.84 1.35.84Zm3.45 0h1.35c.57 0 1.1-.32 1.35-.84a1.48 1.48 0 1 0-2.73-1.13l.03.45v1.52Z"
				fill="#FC7900"
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M6 6.5h24v24H6z" />
			</clipPath>
		</defs>
	</Svg>
);
