import { useTranslation } from 'next-i18next';
import { useMemo, useState } from 'react';

import { isAddress } from 'ethers/lib/utils';
import Link from 'next/link';
import { BabyRobotInterests } from 'src/features/babyRobot/mint/steps/interests/BabyRobotMintInterests';
import { Display1, Input } from 'src/components';
import { interests } from 'src/features/babyRobot/mint/steps/interests/constants';
import { RobotImage } from './RobotImage';
import { StepLabel } from './components/StepLabel';
import { WalletScore } from './WalletScore';
import { RobotPreview } from '../../types';
import { formatToCompactNotation, formatUsdValue } from 'src/utils/formattes';
import { MakeMeRandomRobotButton } from './components/MakeMeRandomRobotButton';
import { RandomRobotsModal } from './components/RandomRobotsModal';
import { SubmitInterestsButton } from './components/SubmitInterestsButton';

type Props = {
	onSubmit: (interests: string[]) => void;
	wallet?: string;
	setWallet: (value?: string) => void;
	robotData: RobotPreview | null | undefined;
	isLoading: boolean;
	isLoadingRandom: boolean;
	randomRobots: string[];
	onCloseRobotsModal: () => void;
	resetResult: () => void;
};

const initialInterests = interests.reduce<{ [key: string]: boolean }>((acc, interest) => {
	acc[interest] = false;
	return acc;
}, {});

export const BabyRobotMintInterestsTest = (props: Props) => {
	const {
		onSubmit,
		wallet,
		setWallet,
		robotData,
		isLoading,
		isLoadingRandom,
		randomRobots,
		onCloseRobotsModal,
		resetResult
	} = props;

	const { t } = useTranslation();

	const [interestsMap, setInterestsMap] = useState(initialInterests);

	const selectedInterestsCount = useMemo(() => Object.values(interestsMap).filter(Boolean).length, [interestsMap]);

	const handleSubmit = () => {
		onSubmit(Object.keys(interestsMap).filter((k) => interestsMap[k]));
	};

	const handleSubmitRandom = () => {
		onSubmit(['random']);
	};

	const handleReset = () => {
		resetResult();
		setInterestsMap(initialInterests);
	};

	const isFirstStepComplete = !!wallet && (isAddress(wallet) || wallet.endsWith('.eth'));
	const isSecondStepComplete = isFirstStepComplete && selectedInterestsCount > 0;

	return (
		<div className="flex min-h-[calc(100vh-112px)] flex-wrap justify-between px-4 pb-[100px] pt-4 lg:min-h-[calc(100vh-146px)] lg:pt-10 lg:pb-[132px]">
			<div className="w-full">
				<Link href="/">
					<img height={24} src="/logo-full.svg" alt="" className="mx-auto mb-8 h-[24px] lg:mb-28" />
				</Link>
			</div>
			<div className="mx-auto flex flex-col lg:mx-0 lg:flex-row lg:flex-nowrap">
				<div className="z-1 relative">
					<Display1 className="mb-8 text-center text-[24px] leading-[28px] lg:text-left lg:text-[28px] lg:leading-[34px]">
						{t('features.babyRobots.mint.steps.interests.title')}
					</Display1>
					<div>
						<WalletInput value={wallet} onChange={setWallet} />
					</div>
					<WalletScore
						isEmpty={!robotData}
						isNotIndexed={!robotData?.scoringAudienceItem}
						walletAddress={robotData?.scoringAudienceItem?.wallet ?? '-'}
						score={robotData?.scoringAudienceItem?.score ?? 0}
						tags={robotData?.scoringAudienceItem?.tags ?? []}
						balance={formatUsdValue(robotData?.scoringAudienceItem?.walletUsdCap) ?? '-'}
						nftsCount={formatToCompactNotation(robotData?.scoringAudienceItem?.nftsCount) ?? '-'}
					/>
					<StepLabel
						stepNumber="2"
						isActive={isFirstStepComplete}
						title={t('features.babyRobots.selectInterestsLabel')}
						className="mt-11"
					/>
					<BabyRobotInterests
						isActive={isFirstStepComplete}
						interestsMap={interestsMap}
						setInterestsMap={setInterestsMap}
					/>
					<StepLabel
						stepNumber="3"
						isActive={isSecondStepComplete}
						title={t('features.babyRobots.robotPreviewStepTitleText')}
						className="mt-11"
					/>
					<div className="flex max-w-full justify-center md:justify-start lg:max-w-[500px]">
						<SubmitInterestsButton
							handleSubmit={handleSubmit}
							disabled={!wallet || isLoading || isLoadingRandom}
							isLoading={isLoading}
							hasResults={!!robotData}
							reset={handleReset}
						/>
					</div>
				</div>
				<div className="mt-6 lg:mt-0 lg:ml-24">
					<RobotImage src={robotData?.targetImage} isLoading={isLoading} />

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
	onChange: (value: string) => void;
};

const WalletInput = (props: WalletInputProps) => {
	const { value = '', onChange } = props;

	const { t } = useTranslation();

	return (
		<Input
			label={<StepLabel isActive stepNumber="1" title={t('features.babyRobots.walletLabel')} />}
			onChange={(e) => {
				onChange(e.target.value);
			}}
			placeholder="0x..."
			value={value}
		/>
	);
};
