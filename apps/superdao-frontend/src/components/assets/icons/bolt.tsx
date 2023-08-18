import { Svg, SvgProps } from '../svg';

export const BoltIcon = (props: SvgProps) => {
	const { width, height, ...restProps } = props;
	return (
		<Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" {...restProps}>
			<path
				fill="url(#bolticon)"
				d="M8.74.443a1 1 0 0 0-.894-.314c-.307.048-.512.26-.6.354-.137.143-.258.3-.381.454L1.16 8.07a5.297 5.297 0 0 0-.27.357c-.07.105-.194.308-.195.573a1 1 0 0 0 .376.783c.207.165.444.195.57.206.13.012.29.012.447.012h2.914v4.339c0 .21 0 .41.013.567.01.128.039.422.248.651a1 1 0 0 0 .894.314c.307-.048.513-.26.601-.354.109-.114.233-.27.365-.434l5.72-7.152c.099-.122.199-.247.271-.357.07-.105.194-.308.194-.573a1 1 0 0 0-.376-.783 1.042 1.042 0 0 0-.569-.206A5.298 5.298 0 0 0 11.917 6H9.002V1.661c0-.21 0-.41-.014-.567C8.978.966 8.95.672 8.74.443Z"
			/>
			<defs>
				<linearGradient id="bolticon" x1=".695" x2="16.077" y1=".117" y2="12.422" gradientUnits="userSpaceOnUse">
					<stop stop-color="#24BFF2" />
					<stop offset="1" stop-color="#2458F2" />
				</linearGradient>
			</defs>
		</Svg>
	);
};
