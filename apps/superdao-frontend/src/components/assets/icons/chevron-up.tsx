import { SVGProps } from 'react';

export const ChevronUp = (props: SVGProps<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="8" fill="none" {...props}>
		<path
			fill={props.fill || '#A2A8B4'}
			fillRule="evenodd"
			d="M14.982 7.086a.937.937 0 0 1-1.318.146L8 2.701 2.336 7.232a.938.938 0 0 1-1.172-1.464l6.25-5a.938.938 0 0 1 1.172 0l6.25 5c.404.323.47.913.146 1.318Z"
			clipRule="evenodd"
		/>
	</svg>
);
