import { Svg, SvgProps } from 'src/components/assets/svg';

export const LinkingIcon = (props: SvgProps) => {
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
			<g opacity="0.4">
				<path
					d="M16.7462 7.00092C16.7191 7.00173 16.692 7.00401 16.6652 7.00775H11.2609C11.1615 7.00635 11.0628 7.02471 10.9706 7.06177C10.8783 7.09883 10.7944 7.15385 10.7236 7.22363C10.6529 7.29342 10.5967 7.37657 10.5583 7.46827C10.5199 7.55996 10.5002 7.65836 10.5002 7.75775C10.5002 7.85715 10.5199 7.95555 10.5583 8.04724C10.5967 8.13894 10.6529 8.22209 10.7236 8.29188C10.7944 8.36166 10.8783 8.41668 10.9706 8.45374C11.0628 8.4908 11.1615 8.50916 11.2609 8.50775H14.9503L7.23058 16.2275C7.15861 16.2966 7.10114 16.3794 7.06155 16.471C7.02197 16.5626 7.00105 16.6611 7.00004 16.7609C6.99902 16.8607 7.01793 16.9597 7.05565 17.0521C7.09336 17.1444 7.14913 17.2284 7.21969 17.2989C7.29025 17.3695 7.37418 17.4253 7.46656 17.463C7.55894 17.5007 7.65792 17.5196 7.7577 17.5186C7.85748 17.5176 7.95605 17.4966 8.04765 17.4571C8.13925 17.4175 8.22202 17.36 8.29113 17.288L16.0109 9.5683V13.2578C16.0095 13.3571 16.0278 13.4558 16.0649 13.548C16.1019 13.6403 16.157 13.7242 16.2267 13.795C16.2965 13.8658 16.3797 13.922 16.4714 13.9603C16.5631 13.9987 16.6615 14.0184 16.7609 14.0184C16.8603 14.0184 16.9587 13.9987 17.0503 13.9603C17.142 13.922 17.2252 13.8658 17.295 13.795C17.3648 13.7242 17.4198 13.6403 17.4568 13.548C17.4939 13.4558 17.5123 13.3571 17.5109 13.2578V7.85248C17.5256 7.74457 17.5167 7.63474 17.4848 7.53062C17.4528 7.4265 17.3986 7.33059 17.3258 7.24955C17.2531 7.16851 17.1635 7.10429 17.0634 7.06135C16.9633 7.01842 16.8551 6.9978 16.7462 7.00092Z"
					fill="white"
				/>
			</g>
		</Svg>
	);
};
