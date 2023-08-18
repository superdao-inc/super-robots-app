import Link from 'next/link';
import Image from 'next/image';
import { useIsAuthorized } from 'src/features/auth/hooks';
import { useAuthModal } from 'src/features/auth/context/authModalContext';
import { useMintedBabyRobotByCurrentUserQuery } from 'src/gql/babyRobot.generated';
import { Label3, Title2 } from 'src/components';

export const BabyRobotBanner = () => {
	const isAuthorized = useIsAuthorized();
	const { openAuthModal } = useAuthModal();
	const { data: mintedRobot } = useMintedBabyRobotByCurrentUserQuery();

	if (!isAuthorized) {
		return (
			<div
				onClick={() => {
					openAuthModal();
				}}
				className="cursor-pointer"
			>
				<BabyRobotBannerImage />
			</div>
		);
	}

	if (mintedRobot) {
		return null;
	}

	return (
		<Link href="/baby-robots/mint" passHref>
			<a>
				<BabyRobotBannerImage />
			</a>
		</Link>
	);
};

const BabyRobotBannerImage = () => {
	return (
		<div className="relative flex h-[155px] flex-col items-start justify-between overflow-hidden bg-gradient-to-r from-[#7524DC] px-4 pt-3 pb-4 sm:h-[347px] sm:rounded-2xl sm:px-[52px] sm:py-12">
			<div className="sm:max-w-[50%]">
				<Title2 className="mb-1 text-[#F2E8FF] sm:mb-5 sm:text-4xl">Super Robots</Title2>
				<Label3 className="max-w-[230px] text-[#EADAFF] sm:max-w-[500px] sm:text-2xl">
					Mint your Super Robot to get personalized offers and be the first to know of new promotions
				</Label3>
			</div>
			<button className="rounded-lg bg-[#ABFC00] py-1.5 px-3 text-xs font-extrabold uppercase sm:py-4 sm:px-11 sm:normal-case">
				Mint for free
			</button>

			<div className="absolute -right-9 -top-0 !h-[117px] !w-[155px] sm:hidden">
				<Image src="/assets/babyRobotBannerMobile.png" width={117} height={155} />
			</div>
			<div className="rounded- absolute right-0 top-0 hidden h-full w-4/12 rounded-tl-[48px] rounded-bl-[48px] bg-black sm:block"></div>
		</div>
	);
};
