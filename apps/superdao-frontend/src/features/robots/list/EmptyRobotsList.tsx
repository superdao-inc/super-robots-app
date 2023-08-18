import { NewLabel1 } from 'src/components';
import { EmptyBoxIcon } from 'src/components/assets/icons/emptyBox';
import { GradientButton } from 'src/features/auth/components/gradientButton';
import { openExternal } from 'src/utils/urls';

export const EmptyRobotsList = () => {
	const handleBuyOnOpensea = () => {
		openExternal('https://opensea.io/collection/super-robots-by-superdao');
	};

	return (
		<div className="relative flex h-full min-h-[300px] w-full items-center justify-center overflow-hidden">
			<div className="1280:pt-[60px] 1280:w-[1000px] 1280:gap-8 768:w-[664px] 768:gap-6 absolute left-auto flex h-full w-[280px] flex-wrap content-start gap-4 pt-10">
				{Array.from(new Array(4)).map((_, key) => (
					<div
						key={key}
						className="768:h-[472px] 768:w-[320px] 1280:h-[660px] 1280:w-[484px] relative z-0 h-[464px] w-[280px] rounded-3xl bg-[#1F2126] pt-6"
					>
						<div className="bg-backgroundPrimary mx-auto h-4 w-[88px] rounded-full border border-[rgba(255,255,255,0.06)]"></div>
					</div>
				))}
				<div className="z-1 from-backgroundPrimary absolute top-0 left-0 h-full w-full bg-gradient-to-t"></div>
				<div className="z-2 absolute top-0 left-0 flex h-full w-full items-center justify-center">
					<div>
						<EmptyBoxIcon className="mx-auto" />
						<NewLabel1 className="mt-6 w-full text-center font-normal">Your Robots will appear here</NewLabel1>
						<GradientButton className="mx-auto mt-8 !rounded-lg" onClick={handleBuyOnOpensea}>
							<NewLabel1 className="shrink-0 font-bold">Buy your first Robot</NewLabel1>
						</GradientButton>
					</div>
				</div>
			</div>
		</div>
	);
};
