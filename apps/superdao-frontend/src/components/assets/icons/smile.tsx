import { Svg, SvgProps } from 'src/components/assets/svg';

export const SmileIcon = (props: SvgProps) => {
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
			<g clipPath="url(#a)" fill="#A2A8B4">
				<path d="M7.73 13.65a1 1 0 0 1 1.37.32 1.52 1.52 0 0 0 .16.22 4 4 0 0 0 .56.56 3.38 3.38 0 0 0 4.36 0 4 4 0 0 0 .72-.77 1 1 0 0 1 1.7 1.04v.02l-.03.03a3.2 3.2 0 0 1-.28.38 5.38 5.38 0 0 1-8.58 0 4.96 4.96 0 0 1-.28-.38l-.02-.03v-.01H7.4a1 1 0 0 1 .33-1.38ZM16.5 9.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM9 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M12 1.25a10.75 10.75 0 1 0 0 21.5 10.75 10.75 0 0 0 0-21.5ZM3.25 12a8.75 8.75 0 1 1 17.5 0 8.75 8.75 0 0 1-17.5 0Z"
				/>
			</g>
			<defs>
				<clipPath id="a">
					<path fill="#fff" d="M0 0h24v24H0z" />
				</clipPath>
			</defs>
		</Svg>
	);
};
