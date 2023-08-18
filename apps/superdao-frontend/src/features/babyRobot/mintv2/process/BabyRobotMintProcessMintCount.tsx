import cn from 'classnames';

import { isProduction } from 'src/constants';
import { Display4, Loader, UserAvatar } from 'src/components';
import { useBabyRobotsMintCountQuery } from 'src/gql/babyRobot.generated';

const MIN_COUNT = 500;

const isMintCountHidden = (count: number) => {
	if (isProduction) {
		return count < MIN_COUNT;
	}

	return false;
};

type Props = {
	className?: string;
};

export const BabyRobotMintProcessMintCount = ({ className }: Props) => {
	const { data, isLoading } = useBabyRobotsMintCountQuery({}, { select: (data) => data.babyRobotsMintCount });
	const { count } = data || { count: 0 };

	if (isLoading) {
		return (
			<div className="mt-8">
				<Loader size="lg" />
			</div>
		);
	}

	const formattedCount = new Intl.NumberFormat('ru-RU').format(count);

	return (
		<div
			className={cn(
				'1280:mt-8 860:mt-5 860:justify-start mt-11 flex items-center justify-center gap-6',
				{
					hidden: isMintCountHidden(count)
				},
				className
			)}
		>
			<div className="-ml-1 flex w-max">
				{Array.from(new Array(4)).map((_, i) => (
					<div key={i} className="w-9 rounded-full">
						<UserAvatar
							size="md"
							src={`/assets/userAvatars/${i + 1}.jpg`}
							className="border-backgroundPrimary rounded-full border-4"
						/>
					</div>
				))}
			</div>
			<Display4 className="text-base opacity-40">{formattedCount} minted</Display4>
		</div>
	);
};
