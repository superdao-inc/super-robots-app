import { Svg, SvgProps } from '../svg';

export const GiftColoredIcon = (props: SvgProps) => {
	return (
		<Svg width={16} height={16} viewBox="0 0 16 16" {...props}>
			<g clip-path="url(#a)">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M12.1 4.49A2.52 2.52 0 0 0 8 1.73a2.52 2.52 0 0 0-4.07 2.82h-.96c-.9 0-1.63.74-1.63 1.64v1.48h5.92V4.56h1.48v3.1h5.93V6.2c0-.9-.73-1.63-1.63-1.63h-.96c0-.03.02-.05.03-.07Zm-3.36.07V3.52a1.04 1.04 0 1 1 1.04 1.04H8.74Zm-1.48 0H6.22a1.04 1.04 0 1 1 1.04-1.04v1.04Z"
					fill="url(#b)"
				/>
				<path d="M13.48 9.15H8.74v5.18h2.82c1.06 0 1.92-.86 1.92-1.92V9.15Z" fill="url(#c)" />
				<path d="M7.26 14.33V9.15H2.52v3.26c0 1.06.86 1.92 1.93 1.92h2.81Z" fill="url(#d)" />
			</g>
			<defs>
				<linearGradient id="b" x1="1.34" y1="1" x2="14.67" y2="14.33" gradientUnits="userSpaceOnUse">
					<stop stop-color="#FFC619" />
					<stop offset="1" stop-color="#FF7919" />
				</linearGradient>
				<linearGradient id="c" x1="1.34" y1="1" x2="14.67" y2="14.33" gradientUnits="userSpaceOnUse">
					<stop stop-color="#FFC619" />
					<stop offset="1" stop-color="#FF7919" />
				</linearGradient>
				<linearGradient id="d" x1="1.34" y1="1" x2="14.67" y2="14.33" gradientUnits="userSpaceOnUse">
					<stop stop-color="#FFC619" />
					<stop offset="1" stop-color="#FF7919" />
				</linearGradient>
				<clipPath id="a">
					<path fill="#fff" d="M0 0h16v16H0z" />
				</clipPath>
			</defs>
		</Svg>
	);
};
