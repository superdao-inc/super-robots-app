import { Svg, SvgProps } from 'src/components/assets/svg';

export const BriefcaseIcon = (props: SvgProps) => {
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
			<path
				d="M19 7H5a2 2 0 0 0-2 2v9c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2ZM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M12 12v.01"
				stroke="#A2A8B4"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M3 13a20 20 0 0 0 18 0"
				stroke="#A2A8B4"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};
