import { useTranslation } from 'next-i18next';

import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { useState } from 'react';
import { shrinkSmallWallet } from '@sd/superdao-shared';

import {
	Label2,
	Loader,
	MagicIcon,
	NewLabel1,
	SocialLinks,
	SubHeading,
	Title3,
	UserAvatarStub,
	toast
} from 'src/components';
import Tooltip from 'src/components/tooltip';
import { GradientButton } from 'src/features/auth/components/gradientButton';
import { useAuthModal } from 'src/features/auth/context/authModalContext';
import { BabyRobotMintProcessMintCount } from 'src/features/babyRobot/mintv2/process/BabyRobotMintProcessMintCount';
import { openExternal } from 'src/utils/urls';
import {
	useMintBabyRobotByCodeMutation,
	useMintedBabyRobotInfoWithImageMetaByWalletQuery
} from 'src/gql/babyRobot.generated';
import { useCurrentUserQuery } from 'src/gql/user.generated';
import { BabyRobotMintResponseStatus } from 'src/types/types.generated';
import { VerifyEmailModal } from 'src/features/auth/components/verifyEmailModal';

type Props = {
	isAuthorized: boolean;
	codeOwner: string;
	onMint: () => void;
	nextAttemptToSendEmail: number | undefined;
};

const socials = { twitter: 'https://twitter.com/robots_xyz', discord: 'https://discord.gg/rHAq2SFh66' };

const superdaoLink = 'https://superdao.co/';

export const ActiveInvitations = ({ isAuthorized, codeOwner, onMint, nextAttemptToSendEmail }: Props) => {
	const { t } = useTranslation();
	const { query, push } = useRouter();
	const queryClient = useQueryClient();

	const { openAuthModal: handleAuth } = useAuthModal();

	const { mutate: mintBabyRobotByCode } = useMintBabyRobotByCodeMutation();

	const { data: currentUser } = useCurrentUserQuery({}, { select: (data) => data.currentUser });

	const [isMinting, setIsMinting] = useState(false);

	const handleMint = () => {
		if (!currentUser || isMinting) return;
		setIsMinting(true);

		mintBabyRobotByCode(
			{ code: query.code as string },
			{
				onSuccess: async ({ mintBabyRobotByCode }) => {
					if (mintBabyRobotByCode.status === BabyRobotMintResponseStatus.AlreadyMinted) {
						toast.error('Robot is already minted');
						setIsMinting(false);
						return;
					}

					if (mintBabyRobotByCode.status === BabyRobotMintResponseStatus.IpExists) {
						toast.error("We can't authorize more robot minting. It seems you have one from another account");
						setIsMinting(false);
						return;
					}

					if (!mintBabyRobotByCode.status || mintBabyRobotByCode.status !== BabyRobotMintResponseStatus.Success) {
						toast.error('Error while minting Robot');
						setIsMinting(false);
						return;
					}

					onMint();

					await useMintedBabyRobotInfoWithImageMetaByWalletQuery.fetcher({
						walletAddress: (currentUser?.walletAddress ?? '').toLowerCase()
					})();

					await queryClient.refetchQueries('MintedBabyRobotByCurrentUser');
					await queryClient.refetchQueries('GetCodeInvitationsInfo');

					push({
						pathname: '/success',
						query: { wallet: currentUser.walletAddress }
					});
				},
				onError: () => {
					toast.error('Error while minting Robot');
					setIsMinting(false);
				}
			}
		);
	};

	const handleSocialClick = (link: string) => {
		openExternal(link);
	};

	const handleRedirectToSuperdao = () => {
		openExternal(superdaoLink);
	};

	const needVerifyEmail = currentUser?.id && !currentUser.emailVerified;

	return (
		<div className="744:pt-[80px] mx-auto flex h-[calc(100vh-56px)] w-full flex-col justify-between pt-10">
			<div className="1440:grow-0 flex w-full grow flex-col justify-between">
				<div className="w-full">
					<div className="mx-auto flex items-center justify-center gap-[10px]">
						<NewLabel1 className="font-normal text-white/[.7]">Invited by</NewLabel1>
						<div className="shrink-0 overflow-hidden rounded-full">
							<UserAvatarStub size="32" seed={codeOwner} />
						</div>
						<NewLabel1 className="block font-normal text-white/[.7]">{shrinkSmallWallet(codeOwner)}</NewLabel1>
					</div>

					<div className="744:mt-6 744:w-[653px] 744:h-[90px] mx-auto mt-4 h-[38px] w-[275px]">
						<img src="/robot-big-text-logo.svg" className="h-full w-full object-cover" />
					</div>

					<NewLabel1 className="744:text-2xl 744:max-w-[653px] mx-auto mt-4 max-w-[280px] text-center font-normal">
						Create and customize your unique digital character
					</NewLabel1>

					<div className="744:gap-6 744:max-w-[340px] mx-auto mt-6 flex max-w-[180px] flex-wrap items-center justify-center gap-4">
						<GradientButton
							className="!w-max min-w-[175px] !rounded-lg"
							onClick={isAuthorized ? handleMint : handleAuth}
						>
							{isMinting ? (
								<Loader color="light" size="lg" />
							) : (
								<NewLabel1 className="shrink-0 font-bold">Mint for free</NewLabel1>
							)}
						</GradientButton>

						<Tooltip
							content={
								<>
									<Label2>{t('features.robotMintV2.content.tooltip.title')}</Label2>
									<SubHeading>{t('features.robotMintV2.content.tooltip.text')}</SubHeading>
								</>
							}
							placement="bottom"
						>
							<div className="flex cursor-pointer items-center gap-4">
								<MagicIcon fill="#42AAF7" width="24" height="24" />
								<NewLabel1 className="font-bold text-[#42AAF7]">{t('features.robotMintV2.content.noGasFee')}</NewLabel1>
							</div>
						</Tooltip>
					</div>
				</div>

				<div className="744:h-[320px] 1440:h-[518px] mt-10 h-[200px] w-full overflow-hidden">
					<img src="/robot-invite-group.png" className="mx-auto h-full object-cover" />
				</div>

				<div></div>
			</div>

			<div className="1440:h-[104px] 1440:w-screen 1440:border-t 1440:border-white/[.06] 1440:mt-8 flex h-[120px] w-full shrink-0 items-center justify-center">
				<div className="1440:w-full 1440:mx-10 1440:flex 1440:justify-between 1440:items-center w-max">
					<div className="1440:block 1440:w-[186px] hidden">
						<SocialLinks onSocialLinkClick={handleSocialClick} {...socials} />
					</div>

					<BabyRobotMintProcessMintCount className="!mt-0" />

					<div className="1440:block hidden">
						<Title3 className="text-base">
							Powered by{' '}
							<span
								className="cursor-pointer underline decoration-white/[.15] underline-offset-4"
								onClick={handleRedirectToSuperdao}
							>
								Superdao
							</span>
						</Title3>
					</div>
				</div>
			</div>

			{needVerifyEmail && (
				<VerifyEmailModal onCodeVerified={handleMint} withClose nextAttemptToSendEmail={nextAttemptToSendEmail} />
			)}
		</div>
	);
};
