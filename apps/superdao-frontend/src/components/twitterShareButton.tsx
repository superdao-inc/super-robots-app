import cn from 'classnames';
import { openExternal } from 'src/utils/urls';
import { TwitterIcon } from './assets/icons';

type Props = {
	btnText?: string;
	twitterText?: string;
	url?: string;
	className: string;
	disabled: boolean;
};

const ENABLED_TEXT_COLOR = '#FFF';
const DISABLED_TEXT_COLOR = '#999999';

export const TwitterShareButton = (props: Props) => {
	const { btnText, twitterText = '', url, className, disabled } = props;

	const handleShare = () => {
		if (disabled) {
			return;
		}

		openExternal(`https://twitter.com/intent/tweet?url=${url}&text=${twitterText}`);
	};

	const iconColor = disabled ? DISABLED_TEXT_COLOR : ENABLED_TEXT_COLOR;

	return (
		<div
			onClick={handleShare}
			className={cn(
				'flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 transition-all duration-100',
				className,
				{
					'bg-[rgba(242,242,242,0.15)]': disabled,
					'cursor-pointer bg-[#1DA1F2] hover:bg-[#1DA1F2]/[.9] active:bg-[#1DA1F2]/[.8]': !disabled
				}
			)}
		>
			<TwitterIcon width={24} height={24} fill={iconColor} />{' '}
			<span
				className={cn(`text-[16px] font-bold`, {
					'text-[#999999]': disabled,
					'text-white': !disabled
				})}
			>
				{btnText || 'Share on Twitter'}
			</span>
		</div>
	);
};
