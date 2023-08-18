import { Svg, SvgProps } from '../svg';

export const CheckMarkCircle = (props: SvgProps) => {
	return (
		<Svg width="40" height="40" viewBox="0 0 40 40" fill="none" {...props}>
			<rect width="40" height="40" rx="20" fill="#F2F3F5" />
			<rect width="40" height="40" rx="20" fill="#FC7900" />
			<rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="black" strokeOpacity="0.04" />
			<g clipPath="url(#clip0_2068_58124)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M29.2071 12.7929C29.5976 13.1834 29.5976 13.8166 29.2071 14.2071L16.2071 27.2071C15.8166 27.5976 15.1834 27.5976 14.7929 27.2071L9.29289 21.7071C8.90237 21.3166 8.90237 20.6834 9.29289 20.2929C9.68342 19.9024 10.3166 19.9024 10.7071 20.2929L15.5 25.0858L27.7929 12.7929C28.1834 12.4024 28.8166 12.4024 29.2071 12.7929Z"
					fill="white"
				/>
			</g>
			<defs>
				<clipPath id="clip0_2068_58124">
					<rect width="24" height="24" fill="white" transform="translate(8 8)" />
				</clipPath>
			</defs>
		</Svg>
	);
};
