import { HTMLAttributes } from 'react';
import { openExternal } from 'src/utils/urls';

type Props = {
	url?: String;
	disabled?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const FacebookShareButton = (props: Props) => {
	const { url, children, disabled, ...rest } = props;

	const handleShare = () => {
		openExternal(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
	};

	return (
		<div onClick={disabled ? undefined : handleShare} {...rest}>
			{children}
		</div>
	);
};
