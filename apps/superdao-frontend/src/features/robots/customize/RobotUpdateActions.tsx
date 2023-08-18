import cn from 'classnames';

import { Button, DoneIcon, NewBody, NewLabel1, RestartIcon, RocketIcon } from 'src/components';
import { useSwitch } from 'src/hooks';
import { DemoRobotDoneModal } from './DemoRobotDoneModal';
import Tooltip from 'src/components/tooltip';

type Props = {
	isUpdateClicked: boolean;
	isRobotUpdating: boolean;
	isRobotChanged: boolean;
	onReset: () => void;
	isDemo?: boolean;
	isUsingOddVersion: boolean;
	imageName: string;
	customParts?: {
		bg?: string;
		eyes?: string;
		tubes?: string;
		body?: string;
		legs?: string;
	};
	onPublishAttemptModal: () => void;
	availableCustomizeActivationsCount: number;
	isUserEligibleForInvites: boolean;
};

export const RobotUpdateActions = (props: Props) => {
	const {
		isRobotChanged,
		isRobotUpdating,
		onReset: handleReset,
		isUpdateClicked,
		isDemo,
		isUsingOddVersion,
		imageName,
		customParts,
		onPublishAttemptModal: handlePublishAttempt,
		availableCustomizeActivationsCount,
		isUserEligibleForInvites
	} = props;

	const [isDemoRobotDoneModalOpen, { off: offDemoRobotDoneModal, on: onDemoRobotDoneModal }] = useSwitch(false);

	const handleDone = () => {
		onDemoRobotDoneModal();
	};

	if (!isRobotChanged || isRobotUpdating || isUpdateClicked) {
		return null;
	}

	return (
		<div className="500:bottom-6 1280:hidden z-1 fixed bottom-0 left-0 h-[72px] w-full">
			<div className="500:rounded-3xl 500:border 500:border-[#FFFFFF0F] 500:w-max 500:bg-[#23262F]/[.7] 500:backdrop-blur-lg mx-auto w-full rounded-t-3xl bg-[#22242A] p-4">
				<div className="flex w-full items-center justify-center gap-4 transition-all">
					<Button
						onClick={handleReset}
						className="h-10 w-[136px]"
						size="lg"
						color="overlaySecondary"
						label="Reset"
						leftIcon={<RestartIcon />}
					/>
					{isDemo ? (
						<div
							onClick={handleDone}
							className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-white py-2 transition-all hover:bg-white/[.9] active:bg-white/[.8]"
						>
							<DoneIcon width={24} height={24} />
							<NewLabel1 className="font-bold text-black">Done</NewLabel1>
						</div>
					) : isUserEligibleForInvites ? (
						<>
							<div
								onClick={handlePublishAttempt}
								className={cn(
									'flex w-[208px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-white py-2 transition-all hover:bg-white/[.9] active:bg-white/[.8]'
								)}
							>
								<RocketIcon />
								<NewLabel1 className="font-bold text-black">Publish</NewLabel1>
								<div className="rounded bg-[#6153CC] px-[6px]">
									<NewBody className="font-bold leading-[19px]">{availableCustomizeActivationsCount}</NewBody>
								</div>
							</div>
							<NewBody className="744:block hidden w-[208px] opacity-70">
								Usually takes minutes.
								<br />
								In rare cases, 1-2 hours
							</NewBody>
						</>
					) : (
						<>
							<Tooltip
								content={
									<div className="h-max max-w-[308px]">
										<NewBody className="w-full text-center">
											You will soon be able to invite
											<br />
											your friends and unlock customization.
											<br />
											Stay tuned 🥳
										</NewBody>
									</div>
								}
								placement="top"
							>
								<div
									className={cn(
										'pointer-events-none flex w-[208px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-white py-2 opacity-40 transition-all hover:bg-white/[.9] active:bg-white/[.8]'
									)}
								>
									<RocketIcon />
									<NewLabel1 className="font-bold text-black">Publish soon</NewLabel1>
								</div>
							</Tooltip>
							<NewBody className="744:block hidden w-[208px] opacity-70">
								Usually takes minutes.
								<br />
								In rare cases, 1-2 hours
							</NewBody>
						</>
					)}
					<DemoRobotDoneModal
						imageName={imageName}
						isUsingOddVersion={isUsingOddVersion}
						customParts={customParts}
						isOpen={isDemoRobotDoneModalOpen}
						onClose={offDemoRobotDoneModal}
					/>
				</div>
			</div>
		</div>
	);
};
