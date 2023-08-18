import { SvgProps, Svg } from '../svg';

export const DeclinedFileIcon = (props: SvgProps) => {
	return (
		<Svg width={32} height={32} viewBox="0 0 32 32" {...props}>
			<g clipPath="url(#clip0_3429_177599)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M6.85873 8.74692C5.27616 10.7383 4.33073 13.2587 4.33073 16C4.33073 22.4433 9.55407 27.6666 15.9974 27.6666C18.7387 27.6666 21.2591 26.7212 23.2504 25.1386L6.85873 8.74692ZM8.74435 6.8613L25.1361 23.253C26.7186 21.2617 27.6641 18.7412 27.6641 16C27.6641 9.55664 22.4407 4.33329 15.9974 4.33329C13.2561 4.33329 10.7357 5.27872 8.74435 6.8613ZM1.66406 16C1.66406 8.08388 8.08131 1.66663 15.9974 1.66663C23.9135 1.66663 30.3307 8.08388 30.3307 16C30.3307 23.916 23.9135 30.3333 15.9974 30.3333C8.08131 30.3333 1.66406 23.916 1.66406 16Z"
					fill={props?.color || '#717A8C'}
				/>
			</g>
			<defs>
				<clipPath id="clip0_3429_177599">
					<rect width="32" height="32" fill="white" />
				</clipPath>
			</defs>
		</Svg>
	);
};
