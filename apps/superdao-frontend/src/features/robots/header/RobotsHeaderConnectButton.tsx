import cn from 'classnames';
import { NewLabel1 } from 'src/components';
import { useLoginWithRedirectToOwnedRobots } from 'src/features/babyRobot/hooks/useLoginWithRedirectToOwnedRobots';

type Props = {
	onClick?: () => void;
	className?: string;
};

export const RobotsHeaderConnectButton = ({ onClick, className }: Props) => {
	const { handleAuth } = useLoginWithRedirectToOwnedRobots();

	const handleAuthWithEffects = () => {
		onClick?.();
		handleAuth();
	};

	return (
		<div
			className={cn(
				'flex h-[40px] w-[120px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-white/[.08] px-4 py-2 transition-all hover:bg-white/[.04]',
				className
			)}
			onClick={handleAuthWithEffects}
		>
			<NewLabel1 className="shrink-0 font-bold">Open app</NewLabel1>
		</div>
	);
};
