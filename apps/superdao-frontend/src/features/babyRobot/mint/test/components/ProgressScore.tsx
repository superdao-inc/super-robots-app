import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { SubHeading } from 'src/components';
import Tooltip from 'src/components/tooltip';
import { colors } from 'src/style';

export const ProgressScore = ({ score, isNumberColumnEnabled }: { score: number; isNumberColumnEnabled: boolean }) => {
	const { t } = useTranslation();

	let progressColor;
	let progressHeight;

	switch (!!score) {
		case score <= 14:
			progressColor = '#9B53FF';
			break;
		case score <= 29:
			progressColor = '#E539AC';
			break;
		case score <= 44:
			progressColor = '#FC7900';
			break;
		case score <= 59:
			progressColor = '#FF9F1A';
			break;
		case score <= 74:
			progressColor = '#C0D732';
			break;
		case score <= 89:
			progressColor = '#7BD732';
			break;
		case score <= 100:
			progressColor = '#32D74B';
			break;
		default:
			progressColor = colors.accentPositive;
	}

	switch (!!score) {
		case score === 1:
			progressHeight = 'h-[2px]';
			break;
		case score === 2:
			progressHeight = 'h-[3px]';
			break;
		case score === 3:
			progressHeight = 'h-[4px]';
			break;
		case score <= 6:
			progressHeight = 'h-[5px]';
			break;
		default:
			progressHeight = 'h-[6px]';
	}

	const progressStyle = { width: `${score}%`, backgroundColor: progressColor };
	const progressContainerStyle = { backgroundColor: colors.foregroundQuaternary };

	const tooltipContent = (
		<div className="flex gap-5">
			<div className="flex flex-col">
				<SubHeading className="font-semibold">{t('components.scoring.audiences.score')}</SubHeading>
				<div>
					<SubHeading className="inline-block">{score}</SubHeading>
				</div>
			</div>
			{isNumberColumnEnabled && (
				<div className="flex flex-col">
					<SubHeading className="font-semibold">{t('components.scoring.audiences.scoringNumber')}</SubHeading>
				</div>
			)}
		</div>
	);

	return (
		<Tooltip className=" w-full first:mt-0 last:mb-0" content={tooltipContent} placement="right">
			<div style={progressContainerStyle} className="flex h-[6px] w-[44px] cursor-pointer items-center rounded-full">
				<div style={progressStyle} className={cn('rounded-full', score !== 100 && 'rounded-r-none', progressHeight)} />
			</div>
		</Tooltip>
	);
};
