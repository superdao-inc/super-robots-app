import { useRouter } from 'next/router';
import { Loader, NewBody, NewLabel1, SuccessIcon } from 'src/components';
import { useSwitch } from 'src/hooks';
import { RobotUpdateStatusHintModal } from './RobotUpdateStatusHintModal';

type Props = {
	isLoading: boolean;
	isRobotUpdatingLoading: boolean;
	isAuthorized: boolean;
	isUpdating: boolean;
	userRobotsTokenIds: string[];
};

export const RobotUpdateStatusNotification = ({
	isLoading,
	isRobotUpdatingLoading,
	isAuthorized,
	isUpdating,
	userRobotsTokenIds
}: Props) => {
	const { query } = useRouter();
	const { tokenId } = query;

	const [isModalOpen, { off: offModal, on: onModal }] = useSwitch(false);

	if (isLoading || isRobotUpdatingLoading || !isAuthorized || !userRobotsTokenIds?.includes(tokenId as string)) {
		return null;
	}

	const updatingContent = (
		<>
			<Loader size="lg" />
			<NewLabel1 className="font-bold">Updating your Robot</NewLabel1>
		</>
	);

	const actualContent = (
		<div>
			<div className="flex items-center gap-[6px]">
				<SuccessIcon width={20} height={20} />
				<NewLabel1 className="font-bold">Robot is up to date</NewLabel1>
			</div>
			<NewBody className="1280:w-max 500:w-[262px] mt-1 w-[228px] font-bold text-white/[.7]">
				If OpenSea still has an old version —{' '}
				<span
					onClick={onModal}
					className="cursor-pointer underline decoration-solid underline-offset-4 transition-all hover:text-white/[.5]"
				>
					update Robot manually
				</span>
			</NewBody>
		</div>
	);

	return (
		<>
			<div className="1280:h-[78px] 500:px-6 flex h-[96px] w-full min-w-max items-center gap-2 rounded-b-2xl border border-white/[0.06] bg-[#22242A] px-4 py-4">
				{isUpdating ? updatingContent : actualContent}
			</div>
			<RobotUpdateStatusHintModal isOpen={isModalOpen} onClose={offModal} tokenId={tokenId as string} />
		</>
	);
};
