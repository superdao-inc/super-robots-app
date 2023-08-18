import { useRouter } from 'next/router';
import { useState } from 'react';
import { Loader } from 'src/components';
import {
	useGetTokenCustomItemsQuery,
	useGetUserCustomItemsQuery,
	useMintedBabyRobotInfoByTokenIdQuery,
	useUserEligibleForCustomizeDataQuery
} from 'src/gql/babyRobot.generated';
import { CustomizeRobot } from './CustomizeRobot';

type Props = {
	isUsingOddVersion: boolean;
};

export const CustomizeRobotContainer = (props: Props) => {
	const { isUsingOddVersion } = props;

	const { query } = useRouter();
	const { tokenId } = query;

	const [subShop, setSubShop] = useState<string | null>(null);

	const handleSelectSubShop = (shop: string) => {
		setSubShop(shop);
	};

	const handleResetSubShop = () => {
		setSubShop(null);
	};

	const { data: mintedBabyRobotInfoByTokenId, isLoading } = useMintedBabyRobotInfoByTokenIdQuery(
		{ tokenId: tokenId as string },
		{ select: (data) => data.mintedBabyRobotInfoByTokenId }
	);
	const { imageName } = mintedBabyRobotInfoByTokenId ?? {};

	const { data: userEligibleForCustomizeData, isLoading: isUserCustomizeDataLoading } =
		useUserEligibleForCustomizeDataQuery({}, { select: (data) => data.userEligibleForCustomizeData });
	const { maxActivationsCount, usedActivationsCount, isUserEligibleForInvites } = userEligibleForCustomizeData ?? {
		maxActivationsCount: 0,
		usedActivationsCount: 0,
		isUserEligibleForInvites: false
	};

	const { data: userCustomItemsData, isLoading: isUserCustomItemsDataLoading } = useGetUserCustomItemsQuery(
		{},
		{ select: (data) => data.getUserCustomItems }
	);
	const userCustomItems = userCustomItemsData ?? [];

	const { data: tokenCustomItemsData, isLoading: isTokenCustomItemsDataLoading } = useGetTokenCustomItemsQuery(
		{ tokenId: tokenId as string },
		{ select: (data) => data.getTokenCustomItems }
	);
	const tokenCustomItems = tokenCustomItemsData ?? [];

	const isImageNotAvailable = !imageName || isLoading;
	const isUserCustomizeDataNotAvailable = isUserCustomizeDataLoading;

	if (
		isImageNotAvailable ||
		isUserCustomizeDataNotAvailable ||
		isUserCustomItemsDataLoading ||
		isTokenCustomItemsDataLoading
	) {
		return (
			<div className="flex h-[80vh] w-full items-center justify-center p-10">
				<Loader size="xl" />
			</div>
		);
	}

	return (
		<CustomizeRobot
			userCustomItems={userCustomItems}
			tokenCustomItems={tokenCustomItems}
			isUserEligibleForInvites={isUserEligibleForInvites}
			availableCustomizeActivationsCount={maxActivationsCount - usedActivationsCount}
			onResetSubShop={handleResetSubShop}
			subShop={subShop}
			onSelectSubShop={handleSelectSubShop}
			imageName={imageName}
			isUsingOddVersion={isUsingOddVersion}
		/>
	);
};
