import { useTranslation } from 'next-i18next';
import { useCallback, useEffect } from 'react';
import { toast } from 'src/components/toast/toast';
import { DangerIcon, Label1 } from 'src/components';
import { colors } from 'src/style';
import { config } from 'src/constants';

import { CHAIN_ID, WRONG_CHAIN_TOAST_ID, useChain } from './useChain';

const CHAIN_NAME = config.polygon.name;

const chainIdMap: Record<number, string> = {
	[config.ethereum.chainId]: config.ethereum.name,
	[config.polygon.chainId]: config.polygon.name
};

export const useCheckChain = (chain?: number, showToast = true) => {
	const { t } = useTranslation();

	const { chainId, switchChain } = useChain();
	const isWrongChain = Boolean(chainId && chainId !== (chain || CHAIN_ID));

	const handleSwitchChain = useCallback(() => switchChain(chain || CHAIN_ID), [chain, switchChain]);

	useEffect(() => {
		if (isWrongChain && showToast) {
			toast(
				<div className="flex items-center gap-2">
					<DangerIcon fill={colors.foregroundPrimary} />
					<Label1>{t('toasts.wrongChain.title')}</Label1>
					<Label1 className="cursor-pointer" color={colors.accentPrimary} onClick={handleSwitchChain}>
						{`${t('toasts.wrongChain.switchButton')} ${chain ? chainIdMap[chain] : CHAIN_NAME}`}
					</Label1>
				</div>,
				{
					id: WRONG_CHAIN_TOAST_ID,
					duration: Infinity
				}
			);
		} else {
			toast.remove(WRONG_CHAIN_TOAST_ID);
		}

		return () => {
			toast.remove(WRONG_CHAIN_TOAST_ID);
		};
	}, [isWrongChain, switchChain, handleSwitchChain, t, showToast, chain]);

	return { isWrongChain, chainId, switchChain };
};
