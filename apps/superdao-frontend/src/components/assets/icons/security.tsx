import { Svg, SvgProps } from '../svg';

export const SecurityIcon = (props: SvgProps) => (
	<Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
		<g clipPath="url(#a)">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 2.5A3.48 3.48 0 0 0 8.5 6v2h7V6c0-1.95-1.55-3.5-3.5-3.5ZM17.5 8V6c0-3.05-2.45-5.5-5.5-5.5A5.48 5.48 0 0 0 6.5 6v2c-.26 0-.5.02-.71.03-.47.03-.9.1-1.32.27a4 4 0 0 0-2.17 2.17c-.17.42-.24.85-.27 1.32-.03.45-.03 1-.03 1.68v2.77c0 .8 0 1.47.04 2.01.05.56.15 1.08.4 1.57a4 4 0 0 0 1.74 1.74c.49.25 1 .35 1.57.4.54.04 1.2.04 2 .04h8.5c.8 0 1.46 0 2-.04a4.09 4.09 0 0 0 1.57-.4 4 4 0 0 0 1.74-1.74c.25-.49.35-1 .4-1.57.04-.54.04-1.2.04-2v-2.78c0-.67 0-1.23-.03-1.68-.03-.47-.1-.9-.27-1.32a4 4 0 0 0-2.17-2.17 4.11 4.11 0 0 0-1.32-.27L17.5 8ZM5.93 10.03c-.37.02-.56.07-.7.12a2 2 0 0 0-1.08 1.08c-.05.14-.1.33-.12.7C4 12.3 4 12.79 4 13.5v2.7c0 .86 0 1.44.04 1.89.03.44.1.66.18.82.19.37.5.68.87.87.16.08.38.15.82.18.45.04 1.03.04 1.89.04h8.4c.86 0 1.44 0 1.89-.04.44-.03.66-.1.82-.18a2 2 0 0 0 .87-.87c.08-.16.15-.38.18-.82.04-.45.04-1.03.04-1.89v-2.7c0-.71 0-1.2-.03-1.57a2.19 2.19 0 0 0-.12-.7 2 2 0 0 0-1.08-1.08c-.14-.05-.33-.1-.7-.12A25.7 25.7 0 0 0 16.5 10h-9c-.71 0-1.2 0-1.57.03Z"
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
