import { Svg, SvgProps } from 'src/components/assets/svg';

export const UsdIcon = (props: SvgProps) => {
	return (
		<Svg width="8" height="16" viewBox="0 0 8 16" fill="none" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4 .6c.5 0 .9.4.9.9v.21a3.57 3.57 0 0 1 2.55 2.57.9.9 0 1 1-1.74.44A1.77 1.77 0 0 0 4 3.4h-.27a1.5 1.5 0 0 0-.32 2.97l1.49.32a3.4 3.4 0 0 1 0 6.63v.18a.9.9 0 0 1-1.8 0v-.21a3.57 3.57 0 0 1-2.56-2.57.9.9 0 1 1 1.75-.44c.2.76.88 1.32 1.7 1.32h.18a1.6 1.6 0 0 0 .34-3.15l-1.48-.32a3.3 3.3 0 0 1 .07-6.47V1.5c0-.5.4-.9.9-.9Z"
				fill="#A2A8B4"
			/>
		</Svg>
	);
};
