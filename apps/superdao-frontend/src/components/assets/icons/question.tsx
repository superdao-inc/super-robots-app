import { Svg, SvgProps } from '../svg';

export const QuestionIcon = (props: SvgProps) => (
	<Svg width={22} height={22} viewBox="0 0 22 22" {...props}>
		<path
			d="M12.25 16.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM11 7c-.83 0-1.5.67-1.5 1.5a1 1 0 1 1-2 0 3.5 3.5 0 1 1 7 0v.05c0 1.25-.66 2.4-1.73 3.05l-.4.24a.77.77 0 0 0-.37.66 1 1 0 1 1-2 0c0-.97.51-1.87 1.34-2.37l.4-.24c.47-.28.76-.79.76-1.34V8.5c0-.83-.67-1.5-1.5-1.5Z"
			fill="fill"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M0 11a11 11 0 1 1 22 0 11 11 0 0 1-22 0Zm11-9a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"
			fill="fill"
		/>
	</Svg>
);
