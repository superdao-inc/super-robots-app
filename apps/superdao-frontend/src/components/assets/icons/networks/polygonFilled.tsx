import { Svg, SvgProps } from 'src/components/assets/svg';

export const PolygonFilledIcon = (props: SvgProps) => (
	<Svg width={16} height={16} fill="none" {...props}>
		<circle cx={8} cy={8} r={8} fill="#EDF0F4" />
		<path
			d="M10.4 6.394a.617.617 0 0 0-.584 0l-1.365.81-.926.514-1.34.81a.617.617 0 0 1-.585 0L4.552 7.89a.599.599 0 0 1-.293-.515V6.148c0-.196.098-.392.293-.515L5.6 5.02a.617.617 0 0 1 .585 0l1.047.638c.171.098.293.294.293.515v.81l.926-.54v-.834a.606.606 0 0 0-.293-.515L6.208 3.94a.617.617 0 0 0-.584 0L3.626 5.118a.54.54 0 0 0-.293.49v2.307c0 .196.098.392.293.515L5.6 9.583c.17.098.39.098.585 0l1.34-.785.926-.54 1.34-.785a.617.617 0 0 1 .585 0l1.048.613c.17.098.292.295.292.516v1.226a.606.606 0 0 1-.292.515l-1.024.613a.617.617 0 0 1-.584 0l-1.048-.613a.599.599 0 0 1-.293-.515v-.785l-.926.54v.81c0 .195.098.392.293.514l1.974 1.153c.17.098.39.098.584 0l1.974-1.153a.598.598 0 0 0 .293-.515v-2.33a.606.606 0 0 0-.293-.515L10.4 6.394Z"
			fill="#8247E5"
		/>
	</Svg>
);
