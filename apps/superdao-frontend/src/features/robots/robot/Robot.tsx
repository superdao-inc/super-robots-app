import { useState } from 'react';

import { useRouter } from 'next/router';
import { ArrowBackIcon, Dropdown, NewTitle1, NewTitle2, OpenShareIcon } from 'src/components';
import { SuperRobotInfo } from 'src/features/robots/common/SuperRobotInfo';
import { CustomizeRobotButton } from 'src/features/robots/robot/CustomizeRobotButton';
import { useRobotDataContext } from '../context/robotDataContext';
import { ViewOnOpenSeaLink } from './ViewOnOpenSeaLink';
import { useCurrentUserQuery } from 'src/gql/user.generated';
import { useIsRobotUpdatingQuery } from 'src/gql/babyRobot.generated';
import { SuperRobotCta } from './SuperRobotCta';
import { ViewOnPolygonscanLink } from './ViewOnPolygonscanLink';
import { useSwitch } from 'src/hooks';
import { TwitterActiveIcon } from 'src/components/assets/icons/social/active/twitter';
import { FacebookActiveIcon } from 'src/components/assets/icons/social/active/fb';
import { openExternal } from 'src/utils/urls';
import { TelegramActiveIcon } from 'src/components/assets/icons/social/active/tg';

type Props = {
	imageName: string;
	propertyTraits: Array<{
		trait_type: string;
		value: string;
	}>;
	owner?: string;
	updatingStatus: boolean;
};

export const Robot = (props: Props) => {
	const { imageName = '', propertyTraits = [], owner, updatingStatus } = props;

	const { tokenId, protocol, hostname } = useRobotDataContext();

	const { push, asPath } = useRouter();

	const [isOpen, { toggle, off }] = useSwitch(false);

	const [isUpdating, setIsUpdating] = useState(updatingStatus);

	const { data: currentUser, isLoading: isCurrentUserLoading } = useCurrentUserQuery(
		{},
		{ select: (data) => data.currentUser }
	);

	// TODO: now buttons are synchronised with RobotUpdateStatusNotification and are locked until token is updating
	// between imageInStorage and token update is some timing ehen image can be shared, but toast and buttons will lock customizing and sharing
	const { isLoading: isRobotUpdatingLoading } = useIsRobotUpdatingQuery(
		{ tokenId: tokenId as string },
		{
			refetchInterval: 10 * 1000,
			onSuccess: (data) => {
				setIsUpdating(data.isRobotUpdating.status);
			}
		} // in ms
	);

	const currentUserWallet = currentUser?.walletAddress?.toLowerCase();

	const isOwnedByCurrentUser =
		isCurrentUserLoading || !owner || !currentUserWallet || isRobotUpdatingLoading
			? false
			: owner.toLowerCase() === currentUserWallet;

	const url = `${protocol}${hostname}${asPath}`;
	const shareText = 'Check out this Super Robot!';

	const handleRedirectToRobots = () => {
		push('/robots');
	};

	const handleTwitterShare = () => {
		openExternal(`https://twitter.com/intent/tweet?url=${url}&text=${shareText}`);
	};

	const handleFacebookShare = () => {
		openExternal(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
	};

	const handleTelegramShare = () => {
		openExternal(`https://telegram.me/share/url?url=${url}&text=${shareText}`);
	};

	return (
		<div className="1280:flex 1280:items-center 1280:justify-center h-full w-full">
			<div className="500:py-10 1280:py-[90px] 500:w-max m-auto h-max w-full p-5">
				<div className="1280:w-full 500:w-[434px] mx-auto flex flex-wrap items-center justify-between">
					<div className="flex items-center gap-4">
						<div
							onClick={handleRedirectToRobots}
							className="1280:flex hidden h-10 w-10 cursor-pointer items-center justify-center opacity-40 transition-all duration-100 hover:opacity-60"
						>
							<ArrowBackIcon />
						</div>
						<NewTitle1 className="1280:text-[32px] 1280:leading-[40px] text-2xl">Super Robot</NewTitle1>
						<NewTitle1 className="1280:text-[32px] 1280:leading-[40px] text-2xl opacity-40"># {tokenId}</NewTitle1>
					</div>

					<div className="1280:w-max 1280:mt-0 children:w-full 500:children:w-max mt-2 flex w-full flex-wrap gap-3">
						<ViewOnOpenSeaLink tokenId={tokenId} />
						{!!owner && owner.toLowerCase() !== currentUserWallet && <ViewOnPolygonscanLink walletAddress={owner} />}
					</div>
				</div>
				<div className="1280:min-w-[1000px] 500:w-[434px] mx-auto mt-8 w-full">
					<SuperRobotInfo
						isLoading={isCurrentUserLoading}
						updatingStatus={updatingStatus}
						propertyTraits={propertyTraits}
						imageName={imageName}
						leftButton={isOwnedByCurrentUser ? <CustomizeRobotButton disabled={isUpdating} /> : null}
						rightButton={
							isOwnedByCurrentUser ? (
								<Dropdown
									isOpen={isOpen}
									placement={'top'}
									onClickOutside={off}
									contentClassName="bg-white/[.08] backdrop-blur-lg py-2 w-[calc(100%-20px-20px)] 500:w-[209px] 1280:w-[191px]"
									content={
										<>
											<div
												onClick={handleTwitterShare}
												className="flex h-10 w-full cursor-pointer items-center gap-3 bg-white/[0] px-4 transition-all duration-100 hover:bg-white/[.04] active:bg-white/[.08]"
											>
												<TwitterActiveIcon />
												<NewTitle2 className="font-normal">Twitter</NewTitle2>
											</div>
											<div
												onClick={handleFacebookShare}
												className="flex h-10 w-full cursor-pointer items-center gap-3 bg-white/[0] px-4 transition-all duration-100 hover:bg-white/[.04] active:bg-white/[.08]"
											>
												<FacebookActiveIcon />
												<NewTitle2 className="font-normal">Facebook</NewTitle2>
											</div>
											<div
												onClick={handleTelegramShare}
												className="flex h-10 w-full cursor-pointer items-center gap-3 bg-white/[0] px-4 transition-all duration-100 hover:bg-white/[.04] active:bg-white/[.08]"
											>
												<TelegramActiveIcon />
												<NewTitle2 className="font-normal">Telegram</NewTitle2>
											</div>
										</>
									}
								>
									<div
										onClick={toggle}
										className="flex h-[56px] w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-white/[.08] transition-all duration-100 hover:bg-white/[.06] active:bg-white/[.04]"
									>
										<OpenShareIcon />
										<NewTitle2 className="font-bold">Share</NewTitle2>
									</div>
								</Dropdown>
							) : null
						}
					/>
				</div>

				<SuperRobotCta />
			</div>
		</div>
	);
};
