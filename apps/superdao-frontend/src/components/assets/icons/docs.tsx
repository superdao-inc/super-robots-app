import { Svg, SvgProps } from 'src/components/assets/svg';

export const DocsIcon = (props: SvgProps) => {
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
			<g clipPath="url(#a)" stroke="#A2A8B4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
				<path d="M9 3h10c.53 0 1.04.24 1.41.68.38.43.59 1.02.59 1.63v10.38c0 .61-.21 1.2-.59 1.63-.37.44-.88.68-1.41.68H9c-.53 0-1.04-.24-1.41-.68A2.5 2.5 0 0 1 7 15.7V5.31c0-.61.21-1.2.59-1.63C7.96 3.24 8.47 3 9 3ZM11 7h6M11 10.5h6" />
				<path d="M17 18v1.7c0 .6-.21 1.2-.59 1.62-.37.44-.88.68-1.41.68H5c-.53 0-1.04-.24-1.41-.68A2.5 2.5 0 0 1 3 19.7V9.31c0-.61.21-1.2.59-1.63C3.96 7.24 4.47 7 5 7h2" />
			</g>
			<defs>
				<clipPath id="a">
					<path fill="#fff" d="M0 0h24v24H0z" />
				</clipPath>
			</defs>
		</Svg>
	);
};
