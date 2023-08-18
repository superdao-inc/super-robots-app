import { Svg, SvgProps } from 'src/components/assets/svg';

export const NotAssignedIcon = (props: SvgProps) => (
	<Svg width={24} height={24} fill="none" {...props}>
		<g clipPath="url(#clip0_24780_14149)">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 3.25C7.16751 3.25 3.25 7.16751 3.25 12C3.25 16.8325 7.16751 20.75 12 20.75C16.8325 20.75 20.75 16.8325 20.75 12C20.75 7.16751 16.8325 3.25 12 3.25ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z"
				fill="#A2A8B4"
			/>
			<path
				d="M8 11C7.2 11 7 11.6667 7 12C7 12.8 7.66667 13 8 13H16C16.3333 13 17 12.8 17 12C17 11.2 16.3333 11 16 11H8Z"
				fill="#A2A8B4"
			/>
		</g>
		<defs>
			<clipPath id="clip0_24780_14149">
				<rect width="24" height="24" fill="white" />
			</clipPath>
		</defs>
	</Svg>
);
