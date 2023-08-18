import { Svg, SvgProps } from '../svg';

export const VotingIcon = (props: SvgProps) => (
	<Svg width={48} height={48} viewBox="0 0 48 48" {...props}>
		<circle cx="24" cy="24" r="24" fill="#FC7900" fillOpacity="0.15" />
		<g clipPath="url(#clip0_635_44224)">
			<path
				d="M24 14C25.1046 14 26 14.8954 26 16V31C26 32.1046 25.1046 33 24 33C22.8954 33 22 32.1046 22 31V16C22 14.8954 22.8954 14 24 14Z"
				fill="#FC7900"
			/>
			<path
				d="M17 20C18.1046 20 19 20.8954 19 22V31C19 32.1046 18.1046 33 17 33C15.8954 33 15 32.1046 15 31V22C15 20.8954 15.8954 20 17 20Z"
				fill="#FC7900"
			/>
			<path
				d="M33 22C33 20.8954 32.1046 20 31 20C29.8954 20 29 20.8954 29 22V31C29 32.1046 29.8954 33 31 33C32.1046 33 33 32.1046 33 31V22Z"
				fill="#FC7900"
			/>
		</g>
		<defs>
			<clipPath id="clip0_635_44224">
				<rect width="24" height="24" fill="white" transform="translate(12 12)" />
			</clipPath>
		</defs>
	</Svg>
);
