import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { Loader } from 'src/components';
import { SuperRobotTraitsList } from 'src/features/robots/common/SuperRobotTraitsList';
import { RobotLayerDisplay } from 'src/features/robotsCommon/RobotLayerDisplay';
import { useRobotVersionContext } from 'src/features/robots/context/robotVersionContext';
import { RobotUpdateStatusNotification } from '../notification/RobotUpdateStatusNotification';
import { useIsAuthorized } from 'src/features/auth/hooks';
import { useIsRobotUpdatingQuery, useUserRobotsTokenIdsQuery } from 'src/gql/babyRobot.generated';

type Props = {
	leftButton: ReactNode;
	rightButton: ReactNode;
	imageName: string;
	propertyTraits: Array<{
		trait_type: string;
		value: string;
	}>;
	isLoading: boolean;
	updatingStatus?: boolean;
	withoutPollRequests?: boolean;
	className?: string;
};

const MAX_MOBILE_SCREEN_WIDTH = 500;

export const SuperRobotInfo = (props: Props) => {
	const {
		imageName,
		propertyTraits,
		isLoading,
		leftButton,
		rightButton,
		withoutPollRequests,
		updatingStatus,
		className
	} = props;

	const { isUsingOddVersion } = useRobotVersionContext();

	const { query } = useRouter();
	const { tokenId } = query;

	const [isUpdating, setIsUpdating] = useState(!!updatingStatus);

	const [isMobile, setIsMobile] = useState(window.innerWidth < MAX_MOBILE_SCREEN_WIDTH);

	useEffect(() => {
		const handleWindowResize = () => {
			setIsMobile(window.innerWidth < MAX_MOBILE_SCREEN_WIDTH);
		};

		window.addEventListener('resize', handleWindowResize);

		return () => window.removeEventListener('resize', handleWindowResize);
	}, []);

	const isAuthorized = useIsAuthorized();

	const { data: userRobotsTokenIds, isLoading: areUserRobotsTokenIdsLoading } = useUserRobotsTokenIdsQuery(
		{},
		{ select: (data) => data.userRobotsTokenIds, enabled: !withoutPollRequests }
	);

	const { isLoading: isRobotUpdatingLoading } = useIsRobotUpdatingQuery(
		{ tokenId: tokenId as string },
		{
			enabled: !withoutPollRequests,
			refetchInterval: 10 * 1000,
			onSuccess: (data) => {
				setIsUpdating(data.isRobotUpdating.status);
			}
		} // in ms
	);

	const isNotificationInvisible =
		isLoading ||
		isRobotUpdatingLoading ||
		!isAuthorized ||
		!userRobotsTokenIds?.includes(tokenId as string) ||
		withoutPollRequests;

	const robotImageContent = imageName ? (
		<RobotLayerDisplay
			imageName={imageName}
			isUsingOddVersion={isUsingOddVersion}
			className={cn('bg-backgroundPrimary aspect-square rounded-t-3xl', { 'rounded-3xl': isNotificationInvisible })}
		/>
	) : (
		<Loader size="lg" />
	);

	const imageContent = isLoading ? <Loader size="lg" /> : robotImageContent;

	return (
		<div className={cn('relative h-full w-full', className)}>
			<div className="flex h-full flex-wrap gap-8">
				<div className="500:w-max h-full w-full">
					<div className="1280:h-[570px] 1280:w-[570px] 500:h-[434px] 500:w-[434px] flex h-full w-full items-center justify-center">
						{imageContent}
					</div>
					<RobotUpdateStatusNotification
						isLoading={areUserRobotsTokenIdsLoading}
						isRobotUpdatingLoading={isRobotUpdatingLoading}
						isAuthorized={isAuthorized}
						isUpdating={isUpdating}
						userRobotsTokenIds={userRobotsTokenIds ?? []}
					/>
				</div>
				<div className="1280:w-max 1280:h-auto 1280:grow 1280:flex 1280:flex-col 1280:justify-between relative w-full">
					<div>
						<SuperRobotTraitsList propertyTraits={propertyTraits} isLoading={isLoading} />
					</div>
					{isMobile ? (
						<>
							<div className="my-4 w-full">{rightButton}</div>
							<div className="sticky bottom-4 z-[19] w-full">{leftButton}</div>
						</>
					) : (
						<div className="500:grid 500:mb-0 500:grid-cols-2 500:sticky 500:bottom-6 1280:sticky 1280:bottom-6 my-4 mt-4 hidden w-full grid-cols-1 gap-4">
							{leftButton}
							{rightButton}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
