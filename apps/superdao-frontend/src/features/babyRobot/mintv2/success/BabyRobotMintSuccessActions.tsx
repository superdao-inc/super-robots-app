import { useRouter } from 'next/router';

import { NewLabel1, Title3 } from 'src/components';
import { RightArrowIcon } from 'src/components/assets/icons/rightArrow';

import { CustomButton } from '../components/CustomButton';
import { DiscordOutlineIcon } from 'src/components/assets/icons/social/outline/discord';
import { openExternal } from 'src/utils/urls';

export const BabyRobotMintSuccessActions = () => {
	const { replace } = useRouter();

	const handleRedirectToNewToken = () => {
		replace('/robots/new');
	};

	const handleOpenDiscord = () => {
		openExternal('https://discord.gg/rHAq2SFh66');
	};

	return (
		<div className="500:relative 500:h-max z-1 500:z-0 500:pt-8 500:pb-8 fixed bottom-0 left-0 flex h-[calc(56px+16px+56px+16px+36px)] w-full justify-center pb-9 pt-4">
			<div className="500:max-w-max mx-auto flex w-max max-w-[280px] flex-wrap items-center justify-center gap-4">
				<CustomButton
					withoutDecorator
					className="h-[56px] w-max"
					contentClassName="!px-6 !py-4 !rounded-lg"
					content={
						<div className="flex items-center gap-3">
							<Title3 className="text-base">Open app</Title3> <RightArrowIcon />
						</div>
					}
					onClick={handleRedirectToNewToken}
				/>
				<div
					onClick={handleOpenDiscord}
					className="flex h-[56px] shrink-0 cursor-pointer items-center justify-center gap-3 rounded-lg bg-white/[.08] px-6 transition-all duration-100 hover:bg-white/[.06] active:bg-white/[.04]"
				>
					<DiscordOutlineIcon />
					<NewLabel1 className="font-bold">Join Discord</NewLabel1>
				</div>
			</div>
		</div>
	);
};
