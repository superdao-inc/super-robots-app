import { useRouter } from 'next/router';
import { Loader, NewLabel1, Title1 } from 'src/components';
import { RobotLayerDisplay } from 'src/features/robotsCommon/RobotLayerDisplay';
import { useMintedBabyRobotInfoQuery } from 'src/gql/babyRobot.generated';

type Props = {
	isUsingOddVersion: boolean;
};

export const RobotMintIsInProgressCard = ({ isUsingOddVersion }: Props) => {
	const { push } = useRouter();

	const { data: robotByTokenImageInfo, isLoading: isRobotByTokenImageInfoLoading } = useMintedBabyRobotInfoQuery(
		{},
		{ select: (data) => data.mintedBabyRobotInfo }
	);
	const { imageName } = robotByTokenImageInfo || {};

	const handleOpenNewRobot = () => {
		push(`/robots/new`);
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
				onClick={handleOpenNewRobot}
			>
				<div>
					<div className="bg-backgroundPrimary mx-auto h-3 w-[64px] rounded-full border border-[rgba(255,255,255,0.06)]"></div>
					<div className="1280:p-8 1280:pt-5 1280:pb-6 p-5">
						<div className="768:flex-no-wrap flex flex-wrap gap-x-4">
							<Title1 className="1280:text-2xl 768:w-max w-full font-black">Super Robot</Title1>
							<div className="h-8 w-[80px] animate-pulse rounded-lg bg-[#35363C]"></div>
						</div>
						<div className="mt-2 h-6 w-[200px] animate-pulse rounded-lg bg-[#35363C]"></div>
					</div>
				</div>
				<div className="1280:h-[420px] 1280:w-[420px] 1280:mx-auto 1280:rounded-lg 1280:overflow-hidden 768:h-[320px] 768:w-[320px] relative flex h-[280px] w-[280px] items-center justify-center">
					{imageContent}
				</div>
				<div className="1280:block hidden w-full p-8 pt-4">
					<div className="flex h-[56px] w-full grow cursor-pointer items-center justify-center gap-3 rounded-lg bg-white/[.08] transition-all duration-100 hover:bg-white/[.06] active:bg-white/[.04]">
						<Loader className="shtink-0" color="light" size="lg" />
						<NewLabel1 className="font-bold">Setting up your Robot&apos;s page!</NewLabel1>
					</div>
				</div>
			</div>
		</>
	);
};
