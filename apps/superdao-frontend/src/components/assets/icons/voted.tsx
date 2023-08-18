import { Svg, SvgProps } from '../svg';

export const VotedIcon = (props: SvgProps) => {
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<circle cx="12" cy="12" r="9.75" fill="white" />
			<g clipPath="url(#clip0_127_27401)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M16.6848 8.20282C16.987 8.48612 17.0023 8.96074 16.719 9.26293L10.6253 15.7629C10.4835 15.9142 10.2854 16 10.0781 16C9.87082 16 9.67276 15.9142 9.53097 15.7629L6.95285 13.0129C6.66955 12.7107 6.68486 12.2361 6.98705 11.9528C7.28923 11.6695 7.76386 11.6848 8.04716 11.987L10.0781 14.1534L15.6247 8.23702C15.908 7.93483 16.3826 7.91952 16.6848 8.20282Z"
					fill="#252B36"
				/>
			</g>
			<defs>
				<clipPath id="clip0_127_27401">
					<rect width="12" height="12" fill="white" transform="translate(6 6)" />
				</clipPath>
			</defs>
		</Svg>
	);
};
