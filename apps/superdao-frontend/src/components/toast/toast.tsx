/*
 * Docs: https://react-hot-toast.com/docs
 * */

import { useEffect } from 'react';
import { toast, ToastBar, Toaster, useToaster, useToasterStore } from 'react-hot-toast';
import styled from '@emotion/styled';
import { colors } from 'src/style';
import { Loader } from 'src/components/common/loader';
import { DoneIcon } from 'src/components/assets/icons';
import { FailureIcon } from 'src/components/assets/icons/failure';

const IconWrapper = styled.div`
	margin-right: 14px;
	display: flex;
	align-items: center;
`;

const toastOptions = {
	style: {
		background: '#2B2B2B',
		color: colors.foregroundPrimary,
		padding: '10px 16px',
		maxWidth: 'none',
		fontWeight: 600
	},
	loading: {
		icon: <Loader size="20" color="light" />
	},
	success: {
		icon: <DoneIcon width={20} height={20} fill={colors.accentPositive} />
	},
	error: {
		icon: <FailureIcon width={20} height={20} fill={colors.accentNegative} />
	}
};

const TOAST_LIMIT = 5;

const CustomToaster = () => {
	const { toasts } = useToasterStore();

	useEffect(() => {
		toasts
			.filter((t) => t.visible)
			.filter((_, i) => i >= TOAST_LIMIT)
			.forEach((t) => toast.remove(t.id));
	}, [toasts]);

	return (
		<Toaster position="bottom-center" toastOptions={toastOptions}>
			{(t) => (
				<ToastBar toast={t} style={{ ...t.style, ...(t.visible ? {} : { animation: 'none' }) }}>
					{({ icon, message }) => (
						<>
							{t.type !== 'blank' && <IconWrapper>{icon}</IconWrapper>}
							<MessageWrapper>{message}</MessageWrapper>
						</>
					)}
				</ToastBar>
			)}
		</Toaster>
	);
};

const MessageWrapper = styled.div`
	margin: 0 auto;

	& > div {
		margin: 0;
	}
`;

export { CustomToaster, toast, useToaster, useToasterStore };
