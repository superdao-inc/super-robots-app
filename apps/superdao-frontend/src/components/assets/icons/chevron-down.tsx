import { SVGProps } from 'react';

export const ChevronDown = (props: SVGProps<SVGSVGElement>) => (
	<svg width={12} height={6} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M.414.532A.75.75 0 0 1 1.47.414L6 4.04 10.531.414a.75.75 0 1 1 .938 1.172l-5 4a.75.75 0 0 1-.937 0l-5-4A.75.75 0 0 1 .414.532Z"
			fill={props.fill || '#A2A8B4'}
		/>
	</svg>
);
