import { useTranslation } from 'next-i18next';
import cn from 'classnames';

import { ComponentProps } from 'react';
import { ArrowCircleRepeatIcon, Button, MagicCompactIcon } from 'src/components';

type BabyRobotMintInterestsStepBottomProps = {
	disabled: boolean;
	handleSubmit: () => void;
	reset: () => void;
	isLoading: boolean;
	hasResults: boolean;
};

export const SubmitInterestsButton = (props: BabyRobotMintInterestsStepBottomProps) => {
	const { disabled, handleSubmit, isLoading, hasResults, reset } = props;

	const { t } = useTranslation();

	if (hasResults) {
		return (
			<BaseMintButton
				leftIcon={<ArrowCircleRepeatIcon />}
				disabled={disabled}
				onClick={reset}
				color="backgroundTertiary"
				label={t('features.babyRobots.regenerateButtonText')}
				isLoading={isLoading}
			/>
		);
	}

	return (
		<BaseMintButton
			leftIcon={<MagicCompactIcon />}
			disabled={disabled}
			onClick={handleSubmit}
			label={t('features.babyRobots.generateButtonText')}
			isLoading={isLoading}
		/>
	);
};

type MintRobotButtonProps = {
	disabled: boolean;
	handleSubmit: () => void;
	isLoading: boolean;
};

export const MintRobotButton = (props: MintRobotButtonProps) => {
	const { disabled, handleSubmit, isLoading } = props;

	const { t } = useTranslation();

	return (
		<BaseMintButton
			leftIcon={<MagicCompactIcon />}
			disabled={disabled}
			onClick={handleSubmit}
			label={t('features.babyRobots.mintButtonText')}
			isLoading={isLoading}
		/>
	);
};

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

const BaseMintButton = (props: PartialBy<Omit<ComponentProps<typeof Button>, 'size'>, 'color'>) => {
	return (
		<Button
			className={cn('w-full justify-center')}
			color={props.disabled ? 'backgroundTertiary' : 'accentPrimary'}
			size="lg"
			{...props}
		/>
	);
};
