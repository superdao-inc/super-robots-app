import { Svg, SvgProps } from 'src/components/assets/svg';

export const DoneOutlineIcon = (props: SvgProps) => {
	return (
		<Svg width="16" height="11" viewBox="0 0 16 11" {...props}>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M14.9129 0.649587C15.279 1.0157 15.279 1.6093 14.9129 1.97541L6.16291 10.7254C5.7968 11.0915 5.2032 11.0915 4.83709 10.7254L1.08709 6.97541C0.720971 6.6093 0.720971 6.0157 1.08709 5.64959C1.4532 5.28347 2.0468 5.28347 2.41291 5.64959L5.5 8.73667L13.5871 0.649587C13.9532 0.283471 14.5468 0.283471 14.9129 0.649587Z"
				fill="fill"
			/>
		</Svg>
	);
};
