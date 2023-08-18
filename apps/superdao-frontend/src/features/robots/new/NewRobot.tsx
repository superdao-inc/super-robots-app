import { useRouter } from 'next/router';

import { Loader, NewLabel1, NewTitle1 } from 'src/components';
import {
	useGetRobotTokenOwnerMutation,
	useMintedBabyRobotByCurrentUserQuery,
	useMintedBabyRobotInfoQuery
} from 'src/gql/babyRobot.generated';
import { RobotMintAndWaitlistStatus } from 'src/types/types.generated';
import { SuperRobotInfo } from 'src/features/robots/common/SuperRobotInfo';

const ButtonPlaceholder = () => <div className="h-[56px] w-full animate-pulse rounded-lg bg-[#2B2D33]" />;

export const NewRobot = () => {
	const { replace } = useRouter();

	const { mutate: getRobotTokenOwner } = useGetRobotTokenOwnerMutation();

	useMintedBabyRobotByCurrentUserQuery(
		{},
		{
			refetchInterval: 5 * 1000, // in ms
			onSuccess: (data) => {
				const { tokenId, status } = data.mintedBabyRobotByCurrentUser ?? {};

				if (status === RobotMintAndWaitlistStatus.Claimed && tokenId) {
					getRobotTokenOwner(
						{ tokenId },
						{
							onSuccess: (data) => {
								if (!data.getRobotTokenOwner?.owner) return;

								replace(`/robots/${tokenId}`);
							},
							onError: () => {}
						}
					);
				}
			}
		}
	);

	const { data: mintedBabyRobotInfo, isLoading } = useMintedBabyRobotInfoQuery(
		{},
		{ select: (data) => data.mintedBabyRobotInfo }
	);
	const { imageName, propertyTraits } = mintedBabyRobotInfo ?? {};

	return (
		<div className="1280:flex 1280:items-center 1280:justify-center h-full w-full">
			<div className="500:py-10 1280:py-[90px] 500:w-max m-auto h-max w-full p-5">
				<div className="1280:mt-0 mx-auto mb-[64px] w-max">
					<Loader size="xl" className="mx-auto" />
					<NewTitle1 className="1280:text-[32px] 1280:leading-[40px] 500:w-max mx-auto mt-6 w-[280px] text-center text-2xl">
						Setting up your Robot&apos;s page!
					</NewTitle1>
					<NewLabel1 className="mx-auto mt-4 text-center">A few moments to go</NewLabel1>
				</div>
				<div className="1280:w-full 500:w-[434px] mx-auto flex flex-wrap items-center justify-between">
					<div className="flex items-center gap-4">
						<NewTitle1 className="1280:text-[32px] 1280:leading-[40px] text-2xl">Super Robot</NewTitle1>
						<div className="h-8 w-16 animate-pulse rounded-lg bg-[#2B2D33]"></div>
					</div>
					<div className="500:w-max w-full">
						<div className="500:mt-0 mt-2 h-8 w-32 animate-pulse rounded-lg bg-[#2B2D33]"></div>
					</div>
				</div>
				<div className="1280:min-w-[1000px] 500:w-[434px] mx-auto mt-8 w-full">
					<SuperRobotInfo
						withoutPollRequests
						isLoading={isLoading}
						propertyTraits={propertyTraits || []}
						imageName={imageName || ''}
						leftButton={<ButtonPlaceholder />}
						rightButton={<ButtonPlaceholder />}
					/>
				</div>
			</div>
		</div>
	);
};
