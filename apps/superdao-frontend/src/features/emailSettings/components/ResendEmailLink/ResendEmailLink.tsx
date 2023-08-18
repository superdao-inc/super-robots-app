import noop from 'lodash/noop';
import { useTranslation } from 'next-i18next';
import { memo, MouseEventHandler, useEffect, useState } from 'react';
import { useMountedState } from 'src/hooks/useMountedState';
import { runTimer } from './runTimer';

type ResendEmailLinkProps = {
	deadline?: number;
	disabled?: boolean;
	onClick: MouseEventHandler<HTMLAnchorElement>;
};

const ResendEmailLink = ({ deadline, disabled = false, onClick }: ResendEmailLinkProps) => {
	const { t } = useTranslation();

	const isMounted = useMountedState();
	const [timer, setTimer] = useState<string | null>(null);

	// Timer
	useEffect(() => {
		if (!deadline) return;
		const cleanTimer = runTimer(deadline, (val, end) => isMounted() && setTimer(end ? null : val));
		return cleanTimer;
	}, [isMounted, deadline]);

	const colorClassName = disabled ? 'text-foregroundTertiary' : 'text-foregroundSecondary';
	const handleClick = disabled ? noop : onClick;

	return !!timer ? (
		<span className="text-foregroundTertiary" data-testid="ResendEmailLink__resendVerification">
			{t('pages.emailSettings.resendVerification')} {timer}
		</span>
	) : (
		<a className={colorClassName} href="#" data-testid="ResendEmailLink__sendVerification" onClick={handleClick}>
			{t('pages.emailSettings.sendVerification')}
		</a>
	);
};

export default memo(ResendEmailLink);
