import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { FC, ReactNode } from 'react';
import { BarsIcon, Body, Caption, Loader, WarningIcon } from 'src/components';
import { colors } from 'src/style';
import { ProgressScore } from './components/ProgressScore';
import { TagList } from './components/TagList';

type Props = {
	isEmpty?: boolean;
	walletAddress?: string;
	score?: number;
	tags?: string[];
	balance?: string;
	nftsCount?: string;
	isNotIndexed?: boolean;
	isLoading?: boolean;
};

const PanelBg: FC<{ children: ReactNode; className?: string }> = (props) => (
	<div
		className={cn(
			'bg-backgroundSecondary text-foregroundSecondary mt-4 flex flex-wrap rounded-lg px-5 py-5 sm:px-6 sm:py-6',
			props.className
		)}
	>
		{props.children}
	</div>
);

const TableHead: FC<{ children: ReactNode }> = (props) => (
	<Caption className="text-foregroundSecondary w-full font-bold leading-[24px] sm:pb-2 sm:leading-[18px]">
		{props.children}
	</Caption>
);
const TableVal: FC<{ children: ReactNode; className?: string }> = (props) => (
	<Body className={cn('text-foregroundPrimary first-letter items-center', props.className)}>{props.children}</Body>
);

const TableCell: FC<{ children: ReactNode }> = (props) => (
	<div className="mb-[18px] flex w-full text-left last:mb-0 sm:mb-0 sm:w-auto sm:flex-col">{props.children}</div>
);

export const WalletScore = (props: Props) => {
	const { walletAddress, score, tags, balance, nftsCount, isEmpty, isNotIndexed, isLoading } = props;

	const { t } = useTranslation();

	if (isLoading) {
		return (
			<PanelBg className="items-center justify-center">
				<Loader size="lg" />
			</PanelBg>
		);
	}

	if (isEmpty)
		return (
			<PanelBg className="items-center justify-center">
				<BarsIcon className="mr-[14px]" />
				{t('features.babyRobots.addWallet')}
			</PanelBg>
		);

	if (isNotIndexed)
		return (
			<PanelBg className="items-center justify-center">
				<WarningIcon fill={colors.foregroundTertiary} className="mr-[14px]" />
				{t('features.babyRobots.walletNotIndexed')}
			</PanelBg>
		);

	return (
		<PanelBg className="items-start justify-between py-3">
			{walletAddress && (
				<TableCell>
					<TableHead>{t('features.babyRobots.walletHead')}</TableHead>
					<TableVal>
						{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
					</TableVal>
				</TableCell>
			)}
			<TableCell>
				<TableHead>{t('features.babyRobots.scoreHead')}</TableHead>
				<TableVal className="flex flex-nowrap items-center">
					<ProgressScore isNumberColumnEnabled={false} score={score ?? 0} />
					<div className="ml-3 text-[#B5BAC5]">{score}</div>
				</TableVal>
			</TableCell>

			<TableCell>
				<TableHead>{t('features.babyRobots.tagsHead')}</TableHead>
				<TableVal>
					{tags?.length ? <TagList tags={tags} /> : <span className="text-foregroundSecondary">–</span>}
				</TableVal>
			</TableCell>

			<TableCell>
				<TableHead>{t('features.babyRobots.balanceHead')}</TableHead>
				<TableVal>{balance}</TableVal>
			</TableCell>

			<TableCell>
				<TableHead>{t('features.babyRobots.nftsHead')}</TableHead>
				<TableVal>{nftsCount}</TableVal>
			</TableCell>
		</PanelBg>
	);
};
