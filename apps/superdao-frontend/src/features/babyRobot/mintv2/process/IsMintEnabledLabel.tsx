import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import { Label6 } from 'src/components';

type Props = {
	isMintTurnedOff: boolean;
};

export const IsMintEnabledLabel = ({ isMintTurnedOff }: Props) => {
	const { t } = useTranslation();

	isMintTurnedOff = true;

	return (
		<div className="1280:max-w-max flex justify-center gap-2">
			<div className={cn('bg-opacity-15 relative flex h-6 w-6 items-center justify-center rounded-full bg-[#00B669]')}>
				<div
					className={cn('bg-opacity-15 absolute top-0 left-0 h-full w-full animate-ping rounded-full bg-[#00B669]')}
				></div>
				<div
					className={cn('flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#00B669] bg-opacity-25')}
				>
					<div className={cn('h-3 w-3 rounded-full bg-[#00B669]')}></div>
				</div>
			</div>
			<Label6 className={cn('text-base font-bold text-[#00B669]')}>
				{isMintTurnedOff ? 'Mint is invite-only' : t('features.robotMintV2.content.mintingNow')}
			</Label6>
		</div>
	);
};
