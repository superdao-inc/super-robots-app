import { SVGProps } from 'react';
import { colors } from 'src/style';

export type SvgProps = SVGProps<SVGSVGElement>;

export const Svg = (props: SvgProps) => {
	return <svg xmlns="http://www.w3.org/2000/svg" fill={colors.foregroundSecondary} {...props} />;
};
