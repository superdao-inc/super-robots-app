import { useTranslation } from 'next-i18next';
import cn from 'classnames';

import { Button } from 'src/components';

type BabyRobotMintInterestsStepBottomProps = {
	disabled: boolean;
	handleSubmit: () => void;
	isLoading: boolean;
};

export const BabyRobotMintInterestsSubmitButton = (props: BabyRobotMintInterestsStepBottomProps) => {
	const { disabled, handleSubmit, isLoading } = props;

	const { t } = useTranslation();

	const isButtonDisabled = disabled;

	return (
		<div className="relative">
			<Button
				className={cn('w-full opacity-100 transition-all sm:w-max')}
				color="accentPrimary"
				size="lg"
				disabled={isButtonDisabled}
				onClick={handleSubmit}
				label={t('actions.labels.next')}
				isLoading={isLoading}
			/>
		</div>
	);
};
