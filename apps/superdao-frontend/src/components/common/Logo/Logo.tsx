import { ImgHTMLAttributes, memo } from 'react';

const Logo = (props: Omit<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height' | 'src' | 'alt'>) => {
	return <img width="36px" height="22px" src="/logo.svg" alt="Superdao logo" {...props} />;
};

export default memo(Logo);
