import { Svg, SvgProps } from '../svg';

export const ArrowCircleRepeatIcon = (props: SvgProps) => (
	<Svg width={22} height={22} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M19.5 0C20.1904 0 20.75 0.559644 20.75 1.25V7C20.75 7.69036 20.1904 8.25 19.5 8.25H19.0917C19.0742 8.25037 19.0567 8.25037 19.0392 8.25H14.25C13.5596 8.25 13 7.69036 13 7C13 6.30964 13.5596 5.75 14.25 5.75H16.7012C15.2842 4.21195 13.2538 3.25 11 3.25C6.71979 3.25 3.25 6.71979 3.25 11C3.25 15.2802 6.71979 18.75 11 18.75C14.6867 18.75 17.7749 16.1745 18.558 12.7234C18.7107 12.0502 19.3804 11.6282 20.0536 11.781C20.7268 11.9338 21.1488 12.6034 20.996 13.2766C19.9602 17.8414 15.8796 21.25 11 21.25C5.33908 21.25 0.75 16.6609 0.75 11C0.75 5.33908 5.33908 0.75 11 0.75C13.8326 0.75 16.3957 1.8991 18.25 3.75459V1.25C18.25 0.559644 18.8096 0 19.5 0Z"
			fill={props.fill || '#A2A8B4'}
		/>
	</Svg>
);
