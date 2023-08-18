import { HTMLAttributes } from 'react';
import cn from 'classnames';

import { EmptyImgIcon } from '../assets/icons/empty-img';

type Props = {
	imgSize?: number;
} & HTMLAttributes<HTMLDivElement>;

export const EmptyImage = (props: Props) => {
	const { imgSize = 16, className, ...rest } = props;
	return (
		<div
			{...rest}
			className={cn('border-overlayTertiary flex items-center justify-center border border-dashed', className)}
		>
			<EmptyImgIcon width={imgSize} height={imgSize} />
		</div>
	);
};
