import { Svg, SvgProps } from 'src/components/assets/svg';

export const GreenStarIcon = (props: SvgProps) => {
	const { width, height, ...restProps } = props;
	return (
		<Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" {...restProps}>
			<path
				fill="url(#greenstaricon)"
				d="M6.553 1.159a.5.5 0 0 1 .897 0l1.492 3.024a.5.5 0 0 0 .377.273l3.337.485a.5.5 0 0 1 .277.853l-2.415 2.354a.5.5 0 0 0-.143.443l.57 3.324a.5.5 0 0 1-.726.527l-2.985-1.57a.5.5 0 0 0-.465 0l-2.985 1.57a.5.5 0 0 1-.726-.527l.57-3.324a.5.5 0 0 0-.143-.443L1.07 5.794a.5.5 0 0 1 .277-.853l3.337-.485a.5.5 0 0 0 .377-.273l1.492-3.024Z"
			/>
			<defs>
				<linearGradient id="greenstaricon" x1=".918" x2="12.526" y1=".88" y2="13.034" gradientUnits="userSpaceOnUse">
					<stop stop-color="#7BD94C" />
					<stop offset="1" stop-color="#3AA64C" />
				</linearGradient>
			</defs>
		</Svg>
	);
};
