import { SvgProps, Svg } from '../svg';

export const OutlineProfileIcon = (props: SvgProps) => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
			<g clipPath="url(#a)" fillRule="evenodd" clipRule="evenodd" fill="#A2A8B4">
				<path d="M12 .5a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5ZM9.25 5.25a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0ZM12 12c-7.87 0-10.5 4.28-10.5 6.5 0 .98.33 1.87.98 2.52A3.5 3.5 0 0 0 5 22h14a3.5 3.5 0 0 0 2.52-.98 3.5 3.5 0 0 0 .98-2.52c0-2.22-2.64-6.5-10.5-6.5Zm-8.5 6.5c0-.78 1.37-4.5 8.5-4.5 7.14 0 8.5 3.72 8.5 4.5 0 .52-.17.88-.4 1.1-.22.23-.58.4-1.1.4H5a1.5 1.5 0 0 1-1.1-.4 1.5 1.5 0 0 1-.4-1.1Z" />
			</g>
			<defs>
				<clipPath id="a">
					<path fill="#fff" d="M0 0h24v24H0z" />
				</clipPath>
			</defs>
		</Svg>
	);
};
