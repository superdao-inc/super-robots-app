import { useRouter } from 'next/router';
import { MouseEvent, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Loader, NewLabel1, Title1 } from 'src/components';
import { Arrow } from 'src/components/assets/icons/arrow';
import { RobotFactoryIcon } from 'src/components/assets/icons/robotFactory';
import { RobotLayerDisplay } from 'src/features/robotsCommon/RobotLayerDisplay';
import { useMintedBabyRobotInfoWithImageMetaAndOwnerByTokenIdQuery } from 'src/gql/babyRobot.generated';
import { ViewOnOpenSeaLink } from '../robot/ViewOnOpenSeaLink';
import {
	useGetIsStatisticClickCustomizeRegisteredQuery,
	useSaveStatisticClickCustomizeMutation
} from 'src/gql/userClicksStatistic.generated';

type Props = {
	tokenId: string;
	isUsingOddVersion: boolean;
};

export const RobotCard = (props: Props) => {
	const { tokenId, isUsingOddVersion } = props;

	const { push } = useRouter();

	const queryClient = useQueryClient();

	const [isRegisteredCustomize, setIsRegisteredCustomize] = useState(false);

	const { data: hasUserCustomizeClickRegistration } = useGetIsStatisticClickCustomizeRegisteredQuery(
		{},
		{ select: (data) => data.getIsStatisticClickCustomizeRegistered }
	);

	const { mutate } = useSaveStatisticClickCustomizeMutation();

	const { data: robotByTokenImageInfo, isLoading: isRobotByTokenImageInfoLoading } =
		useMintedBabyRobotInfoWithImageMetaAndOwnerByTokenIdQuery(
			{ tokenId },
			{ select: (data) => data.mintedBabyRobotInfoWithImageMetaAndOwnerByTokenId }
		);
	const { imageName } = robotByTokenImageInfo || {};

	const handleOpenRobot = () => {
		push(`/robots/${tokenId}`);
	};

	const handleOpenRobotCustomize = () => {
		if (!hasUserCustomizeClickRegistration && !isRegisteredCustomize) {
			setIsRegisteredCustomize(true);

			mutate(
				{},
				{
					onSuccess: async (data) => {
						if (!data.saveStatisticClickCustomize) {
							setIsRegisteredCustomize(false);
							return;
						}

						await queryClient.refetchQueries('GetIsStatisticClickCustomizeRegistered');
					},
					onError: () => {
						setIsRegisteredCustomize(false);
					}
				}
			);
		}

		push(`/robots/${tokenId}/customize`);
	};

	const handleStopPropagation = (e: MouseEvent) => {
		e.stopPropagation();
	};

	const robotImageContent = imageName ? (
		<RobotLayerDisplay imageName={imageName} isUsingOddVersion={isUsingOddVersion} className="bg-[#222429]" />
	) : (
		<Loader size="lg" />
	);

	const imageContent = isRobotByTokenImageInfoLoading ? <Loader size="lg" /> : robotImageContent;

	return (
		<>
			<div
				className="1280:w-[484px] 768:w-[320px] flex w-[280px] cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.06)] bg-[#ffffff0A] pt-4"
				onClick={handleOpenRobot}
			>
				<div>
					<div className="bg-backgroundPrimary mx-auto h-3 w-[64px] rounded-full border border-[rgba(255,255,255,0.06)]"></div>
					<div className="1280:p-8 1280:pt-5 1280:pb-6 p-5">
						<div className="768:flex-no-wrap flex flex-wrap gap-x-4">
							<Title1 className="1280:text-2xl 768:w-max w-full font-black">Super Robot</Title1>
							<Title1 className="1280:text-2xl font-black opacity-40">#{tokenId}</Title1>
						</div>
						<ViewOnOpenSeaLink className="mt-2" tokenId={tokenId} />
					</div>
				</div>
				<div className="1280:h-[420px] 1280:w-[420px] 1280:mx-auto 1280:rounded-lg 1280:overflow-hidden 768:h-[320px] 768:w-[320px] relative flex h-[280px] w-[280px] items-center justify-center">
					{imageContent}
				</div>
				<div className="1280:block hidden w-full  p-8 pt-4">
					<div className="flex cursor-default gap-4" onClick={handleStopPropagation}>
						<div
							onClick={handleOpenRobotCustomize}
							className="flex h-[56px] w-1/2 grow cursor-pointer items-center justify-center gap-3 rounded-lg bg-white transition-all duration-100 hover:bg-white/[.9] active:bg-white/[.8]"
						>
							<RobotFactoryIcon fill="#1A1A1A" />
							<NewLabel1 className="font-bold text-[#1A1A1A]">Customize</NewLabel1>
						</div>
						<div
							onClick={handleOpenRobot}
							className="flex h-[56px] w-1/2 grow cursor-pointer items-center justify-center gap-3 rounded-lg bg-white/[.08] transition-all duration-100 hover:bg-white/[.06] active:bg-white/[.04]"
						>
							<NewLabel1 className="font-bold">Open</NewLabel1>
							<Arrow className="opacity-40" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
