import { useRouter } from 'next/router';
import { Button, NewLabel1, NewTitle1 } from 'src/components';
import { GradientButton } from 'src/features/auth/components/gradientButton';
import { useIsUserRobotTokenOwnerOrMinterQuery } from 'src/gql/babyRobot.generated';
import { openExternal } from 'src/utils/urls';

export const SuperRobotCta = () => {
	const { push } = useRouter();

	const { data, isLoading } = useIsUserRobotTokenOwnerOrMinterQuery();
	const { isUserRobotTokenOwnerOrMinter } = data || {};

	const handleRedirectToMint = () => {
		push('/');
	};

	const handleOpenCollection = () => {
		openExternal('https://opensea.io/collection/super-robots-by-superdao');
	};

	// show cta if response is false
	if (isLoading || isUserRobotTokenOwnerOrMinter === undefined || isUserRobotTokenOwnerOrMinter) {
		return null;
	}

	return (
		<div className="500:max-w-[434px] 500:mx-auto 768:h-[256px] 768:w-[664px] 1280:w-[1000px] 768:max-w-full 1280:mt-20 768:mt-10 relative mt-5 h-[656px] w-full overflow-hidden rounded-3xl border border-white/[.06]">
			<div className="1280:right-[838px] 1280:-top-[14px] 768:right-[422px] absolute right-[38px] -top-[14px] h-[221px] w-[134px] bg-[#4f95ff] opacity-60 blur-[200px]"></div>
			<div className="768:left-[243px] 1280:left-[659px] 768:-bottom-[calc(5px+326px)] absolute -left-[121px] bottom-[69px] h-[326px] w-[421px] bg-[#e6a8f0] opacity-60 blur-[200px]"></div>

			<div className="relative h-full w-full p-8">
				<div className="z-1 relative">
					<NewTitle1 className="text-[32px] leading-10">Get your own Robot</NewTitle1>
					<NewLabel1 className="768:max-w-[395px] mt-4 max-w-[216px] font-normal">
						Mint your own Robot or choose from over 40,000 Robots on OpenSea
					</NewLabel1>
					<div className="768:max-w-max mt-8 flex max-w-[195px] flex-wrap gap-4">
						<GradientButton
							className="!w-max !rounded-lg !shadow-none hover:!shadow-none"
							onClick={handleRedirectToMint}
						>
							<NewLabel1 className="shrink-0 font-bold">Go to mint page</NewLabel1>
						</GradientButton>
						<Button size="xxl" color="iconBackground" className="rounded-lg" onClick={handleOpenCollection}>
							<NewLabel1 className="shrink-0 font-bold">Buy on OpenSea</NewLabel1>
						</Button>
					</div>
				</div>

				<div className="absolute left-0 bottom-0 z-0 h-[264px] w-full overflow-hidden rounded-b-3xl">
					<div className="768:left-[470px] 1280:left-[570px] 1280:bottom-8 768:bottom-7 768:-top-7 1280:-top-8 absolute top-0 bottom-0 -left-[80px] w-[767px]">
						<img src="/robot-group.png" />
					</div>
				</div>
			</div>
		</div>
	);
};
