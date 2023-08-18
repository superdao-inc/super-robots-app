import { Svg, SvgProps } from '../svg';

export const GroupIcon = (props: SvgProps) => {
	return (
		<Svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M8 2.5L2 5.5L8 8.5L14 5.5L8 2.5Z" fill="#A2A8B4" stroke="#A2A8B4" strokeLinejoin="round" />
			<path d="M2 8L8 11L14 8" stroke="#A2A8B4" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M2 10.5L8 13.5L14 10.5" stroke="#A2A8B4" strokeLinecap="round" strokeLinejoin="round" />
		</Svg>
	);
};
