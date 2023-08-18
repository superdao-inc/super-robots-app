import { colors } from 'src/style';
import { Svg, SvgProps } from '../svg';

export const DollarIcon = (props: SvgProps) => {
	return (
		<Svg width="40" height="40" fill="none" {...props}>
			<rect width="40" height="40" rx="20" fill={colors.backgroundTertiary} />
			<path
				d="M20 9.75c.69 0 1.25.56 1.25 1.25v.4a5.259 5.259 0 0 1 3.834 3.788 1.25 1.25 0 1 1-2.42.624A2.752 2.752 0 0 0 20 13.75h-.399a2.351 2.351 0 0 0-.502 4.648l2.227.488a4.99 4.99 0 0 1-.076 9.766V29a1.25 1.25 0 1 1-2.5 0v-.4a5.259 5.259 0 0 1-3.835-3.788 1.25 1.25 0 1 1 2.422-.624A2.752 2.752 0 0 0 20 26.25h.26a2.49 2.49 0 0 0 .532-4.922l-2.227-.487a4.851 4.851 0 0 1 .185-9.517V11c0-.69.56-1.25 1.25-1.25Z"
				fill="url(#dollarGradient)"
			/>
			<defs>
				<linearGradient id="dollarGradient" x1="14.75" y1="9.75" x2="31.386" y2="18.271" gradientUnits="userSpaceOnUse">
					<stop stopColor="#7BD94C" />
					<stop offset="1" stopColor="#3AA64C" />
				</linearGradient>
			</defs>
		</Svg>
	);
};
