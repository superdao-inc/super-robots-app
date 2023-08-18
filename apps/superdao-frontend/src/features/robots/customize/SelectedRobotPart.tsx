import cn from 'classnames';
import { getCurrentPartsVersion, ROBOT_PARTS_URL } from '@sd/superdao-shared';
import { Title3 } from 'src/components';
import { RobotWardrobeImage } from './RobotWardrobeImage';

type Props = {
	isUsingOddVersion: boolean;
	item: string;
	translation: string;
};

export const SelectedRobotPart = ({ isUsingOddVersion, translation, item }: Props) => {
	const isBg = item.startsWith('BG');

	const robotPartsPrefix = `${ROBOT_PARTS_URL}/${isBg ? '' : 'preview-'}${getCurrentPartsVersion(isUsingOddVersion)}`;

	return (
		<div className="flex w-full items-center gap-4">
			<div
				className={cn(
					'flex h-[64px] w-[64px] shrink-0 items-center justify-center overflow-hidden rounded-lg border-white/[.06] bg-white/[.04]',
					{ 'p-2': !isBg }
				)}
			>
				<RobotWardrobeImage src={`${robotPartsPrefix}/${item}.png`} />
			</div>
			<Title3 className="w-full truncate text-base">{translation}</Title3>
		</div>
	);
};
