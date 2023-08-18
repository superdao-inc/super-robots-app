import { SvgProps, Svg } from '../svg';

export const OutlineInformationIcon = (props: SvgProps) => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
			<g clipPath="url(#a)" fill="#A2A8B4">
				<path d="M12 10.5a1 1 0 0 1 1 1V17a1 1 0 1 1-2 0v-5.5a1 1 0 0 1 1-1ZM12 8.5A1.25 1.25 0 1 0 12 6a1.25 1.25 0 0 0 0 2.5Z" />
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M1.25 12a10.75 10.75 0 1 1 21.5 0 10.75 10.75 0 0 1-21.5 0ZM12 3.25a8.75 8.75 0 1 0 0 17.5 8.75 8.75 0 0 0 0-17.5Z"
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
