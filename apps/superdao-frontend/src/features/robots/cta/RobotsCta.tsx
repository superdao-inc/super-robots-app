import { NewLabel1, NewTitle1 } from 'src/components';
import { GradientButton } from 'src/features/auth/components/gradientButton';
import { openExternal } from 'src/utils/urls';

export const RobotsCta = () => {
	const handleOpenCollection = () => {
		openExternal('https://opensea.io/collection/super-robots-by-superdao');
	};

	return (
		<div className="relative overflow-hidden rounded-3xl">
			<div className="1280:w-[484px] 768:w-[320px] 1280:h-[660px] relative relative h-[464px] w-[280px] overflow-hidden border border-white/[.06] px-5">
				<div className="absolute left-[138px] -top-[14px] h-[221px] w-[134px] bg-[#4f95ff] opacity-60 blur-[200px]"></div>
				<div className="768:-bottom-[215px] 1280:-bottom-[41px] absolute -left-[18px] -bottom-[223px] h-[326px] w-[421px] bg-[#e6a8f0] opacity-60 blur-[200px]"></div>

				<div className="relative h-full w-full">
					<NewTitle1 className="1280:mt-[103px] 1280:text-[32px] 1280:leading-10 768:mt-[62px] mt-[57px] text-center text-2xl">
						Get more robots
					</NewTitle1>
					<NewLabel1 className="1280:max-w-[384px] mx-auto mt-4 text-center font-normal opacity-70">
						Expand your collection — get new robots on OpenSea
					</NewLabel1>
					<GradientButton
						className="1280:mt-8 mx-auto mt-6 !w-max !rounded-lg !shadow-none hover:!shadow-none"
						onClick={handleOpenCollection}
					>
						<NewLabel1 className="shrink-0 font-bold">Buy on OpenSea</NewLabel1>
					</GradientButton>
					<div className="768:-left-[120px] 768:bottom-[30px] 768:h-[190px] 768:w-[520px] 1280:h-[260px] 1280:w-[780px] 1280:-left-[165px] 1280:bottom-[90px] absolute bottom-[50px] -left-[110px] h-[150px] w-[460px] rounded-3xl">
						<img src="/robot-group.png" />
					</div>
				</div>
			</div>
		</div>
	);
};
