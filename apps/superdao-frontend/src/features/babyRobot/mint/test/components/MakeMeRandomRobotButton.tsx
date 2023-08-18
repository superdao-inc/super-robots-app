import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Button, CircleArrowsIcon } from 'src/components';

type Props = {
	onClick: () => void;
	isLoading: boolean;
};

export const MakeMeRandomRobotButton: React.FC<Props> = ({ onClick, isLoading }) => {
	const { t } = useTranslation();

	return (
		<Button
			leftIcon={<CircleArrowsIcon className={cn('mr-1', { 'animate-spin': isLoading })} />}
			className="mx-auto mt-10 opacity-100 transition-all "
			color="transparent"
			size="lg"
			onClick={onClick}
			label={t('features.babyRobots.makeRandomRobotBtn')}
		/>
	);
};
