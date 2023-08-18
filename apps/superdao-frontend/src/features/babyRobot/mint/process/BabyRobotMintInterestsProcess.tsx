import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import Link from 'next/link';
import cn from 'classnames';
import { Display1, Display3, Input } from 'src/components';
import { interests } from 'src/features/babyRobot/mint/steps/interests/constants';
import { WalletScore } from '../test/WalletScore';
import { StepLabel } from '../test/components/StepLabel';
import { formatToCompactNotation, formatUsdValue } from 'src/utils/formattes';
import { MintRobotButton } from '../test/components/SubmitInterestsButton';
import { RobotImage } from '../test/RobotImage';
import { MakeMeRandomRobotButton } from '../test/components/MakeMeRandomRobotButton';
import { RandomRobotsModal } from '../test/components/RandomRobotsModal';
import { AuthButton } from 'src/features/topMenu/authButton';
import { useLogout } from 'src/features/auth/hooks';
import { ScoringAudienceItem } from 'src/types/types.generated';

type Props = {
	isAuthorized: boolean;
	onSubmit: (interests: string[]) => void;
	wallet?: string;
	robotData?: ScoringAudienceItem;
	isLoading: boolean;
	isRobotDataLoading: boolean;
	isLoadingRandom: boolean;
	randomRobots: string[];
	onCloseRobotsModal: () => void;
	resetResult: () => void;
};

const initialInterests = interests.reduce<{ [key: string]: boolean }>((acc, interest) => {
	acc[interest] = false;
	return acc;
}, {});

export const BabyRobotMintInterestsProcess = (props: Props) => {
	const {
		isAuthorized,
		onSubmit,
		wallet,
		robotData,
		isLoading,
		isRobotDataLoading,
		isLoadingRandom,
		randomRobots,
		onCloseRobotsModal
	} = props;

	const { t } = useTranslation();

	const { mutate: logout } = useLogout('', true);

	const handleLogout = () => {
		logout({});
	};

	const [interestsMap, _setInterestsMap] = useState(initialInterests);

	const handleSubmit = () => {
		onSubmit(Object.keys(interestsMap).filter((k) => interestsMap[k]));
	};

	const handleSubmitRandom = () => {
		onSubmit(['random']);
	};

	// const isFirstStepComplete = !!wallet && (isAddress(wallet) || wallet.endsWith('.eth'));

	return (
		<div className="flex min-h-[calc(100vh-112px)] flex-wrap justify-between px-4 pb-[100px] pt-4 lg:min-h-[calc(100vh-146px)] lg:pt-10 lg:pb-[132px]">
			<div className="w-full">
				<Link href="/">
					<img height={24} src="/logo-full.svg" alt="" className="mx-auto mb-8 h-[24px] lg:mb-28" />
				</Link>
			</div>
			<div className="mx-auto flex flex-col lg:mx-0 lg:flex-row lg:flex-nowrap">
				<div className="z-1 relative w-full sm:w-[550px]">
					<Display1 className="mb-8 text-center text-[24px] leading-[28px] lg:text-left lg:text-[28px] lg:leading-[34px]">
						{t('features.babyRobots.mint.steps.mintProcess.title')}
					</Display1>

					<div className="mb-2 flex justify-between">
						<StepLabel className="!mb-3" isActive stepNumber="1" title={t('features.babyRobots.walletLabel')} />
						{isAuthorized && (
							<Display3
								className="text-accentPrimary h-7 w-[61px] cursor-pointer overflow-hidden sm:w-max"
								onClick={handleLogout}
							>
								{t('actions.labels.changeWallet')}
							</Display3>
						)}
					</div>
					{isAuthorized ? (
						<>
							<div>
								<WalletInput isDisabled value={wallet} />
							</div>
							<WalletScore
								isLoading={isRobotDataLoading}
								isEmpty={!robotData && !isAuthorized}
								isNotIndexed={!robotData}
								walletAddress={robotData?.wallet ?? '-'}
								score={robotData?.score ?? 0}
								tags={robotData?.tags ?? []}
								balance={formatUsdValue(robotData?.walletUsdCap) ?? '-'}
								nftsCount={formatToCompactNotation(robotData?.nftsCount) ?? '-'}
							/>
						</>
					) : (
						<AuthButton noTransform className="w-full md:w-max" />
					)}

					{
						// TODO: maybe uncomment if needed https://linear.app/superdao/issue/CRM-997/dobavit-validaciyu-na-stranice-success-chto-wallet-mintil-chtoby-ne
					}
					{/* <StepLabel
						stepNumber="2"
						isActive={isFirstStepComplete && isAuthorized}
						title={t('features.babyRobots.selectInterestsLabel')}
						className="mt-11"
					/>
					<BabyRobotInterests
						isActive={isFirstStepComplete && isAuthorized}
						interestsMap={interestsMap}
						setInterestsMap={setInterestsMap}
					/> */}
					<StepLabel
						stepNumber="2"
						isActive={isAuthorized}
						title={t('features.babyRobots.robotProcessMintStepTitleText')}
						className="mt-12"
					/>
					<div
						className={cn(
							'flex max-w-full flex-wrap items-center justify-center gap-2 md:justify-start md:gap-7 lg:max-w-[500px]'
						)}
					>
						<div className="relative w-full md:w-max">
							<MintRobotButton
								handleSubmit={handleSubmit}
								disabled={!wallet || isLoading || isLoadingRandom || !isAuthorized}
								isLoading={isLoading}
							/>
						</div>
						<Display3 className="text-foregroundTertiary w-full text-center md:w-max md:text-start">
							{t('features.babyRobots.noGasFeeHint')}
						</Display3>
					</div>
				</div>
				<div className="mt-6 lg:mt-0 lg:ml-24">
					<RobotImage src={undefined} defaultSrc="/assets/robot-mint.png" isLoading={isLoading} />

					<MakeMeRandomRobotButton onClick={handleSubmitRandom} isLoading={isLoadingRandom} />
				</div>
			</div>
			<RandomRobotsModal
				randomRobots={randomRobots}
				reloadRandom={handleSubmitRandom}
				isLoading={isLoadingRandom}
				onClose={onCloseRobotsModal}
			/>
		</div>
	);
};

type WalletInputProps = {
	value?: string;
	onChange?: (value: string) => void;
	isDisabled?: boolean;
};

const WalletInput = (props: WalletInputProps) => {
	const { value = '', onChange, isDisabled } = props;

	return (
		<Input
			readOnly={isDisabled}
			className={cn(isDisabled && 'text-foregroundSecondary')}
			onChange={(e) => {
				onChange?.(e.target.value);
			}}
			placeholder="0x..."
			value={value}
		/>
	);
};
