/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useQueryClient } from 'react-query';

import { Button, Label1, ModalTitle, Title4, toast } from 'src/components';
import { Arrow } from 'src/components/assets/icons/arrow';
import { ModalContent } from 'src/components/baseModal';
import { useValidateUserOtpEmailResponseMutation } from 'src/gql/emailSettings.generated';
import { useSwitch } from 'src/hooks';
import { OtpValidationStatus } from 'src/types/types.generated';
import { GradientButton } from 'src/features/auth/components/gradientButton';

type Props = {
	email: string;
	onResendCode: (email: string, onError: () => void) => void;
	onCodeExpired: () => void;
	onEmailChange: () => void;
	onCodeVerified?: () => void;
	nextAttemptToSendEmail: number | undefined;
};

const numInputs = 6;

export const EnterCodeModal = (props: Props) => {
	const { email, onResendCode, onCodeExpired, onEmailChange, onCodeVerified, nextAttemptToSendEmail } = props;

	const { t } = useTranslation();
	const queryClient = useQueryClient();

	const { mutate: validateOtp } = useValidateUserOtpEmailResponseMutation();

	const [countdown, setCountdown] = useState(0);
	const [otp, setOtp] = useState('');
	const [isErrored, { on: setIsErrored, off: setIsNotErrored }] = useSwitch(false);

	const buttonRef = useRef<HTMLButtonElement>(null);

	const handleSubmit = () => {
		validateOtp(
			{ validateUserOTPEmailInput: { otp } },
			{
				onSuccess: async ({ validateUserOTPEmailResponse }) => {
					const { status } = validateUserOTPEmailResponse;

					if (status === OtpValidationStatus.Fail) {
						toast.error(t('modals.enterCode.errors.invalid'));

						setIsErrored();
						setOtp('');

						return;
					}

					if (status === OtpValidationStatus.Expired) {
						toast.error(t('modals.enterCode.errors.expired'));

						onCodeExpired();

						return;
					}

					onCodeVerified?.();

					toast.success(t('modals.enterCode.success'));

					await queryClient.refetchQueries('CurrentUser');
				},
				onError: () => {
					toast.error(t('modals.enterCode.errors.unknown'));
				}
			}
		);
	};

	useEffect(() => {
		let interval: ReturnType<typeof setInterval> | undefined;

		if (nextAttemptToSendEmail && nextAttemptToSendEmail > 0) {
			interval = setInterval(() => {
				setCountdown((countdown) => countdown + 1);
			}, 1000);
		}

		return () => {
			if (!interval) return;

			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		if (isErrored) {
			setTimeout(() => {
				setIsNotErrored();
			}, 3000);
		}
	}, [isErrored]);

	const isOtpFulfilled = otp.length === numInputs;

	useEffect(() => {
		if (isOtpFulfilled) {
			const keyDownHandler = (event: KeyboardEvent) => {
				if (event.key === 'Enter') {
					event.preventDefault();

					buttonRef?.current?.focus();
					buttonRef?.current?.click();
				}
			};

			document.addEventListener('keydown', keyDownHandler);

			return () => {
				document.removeEventListener('keydown', keyDownHandler);
			};
		}
	}, [isOtpFulfilled]);

	const handleChange = (newOtp: string) => {
		setOtp(newOtp);
	};

	const handleResendCode = () => {
		setCountdown(0);

		onResendCode(email, () => {
			toast.error(t('pages.email.verification.modal.error'));
		});
	};

	const secondsBeforeResend = nextAttemptToSendEmail ? nextAttemptToSendEmail - countdown : 0;

	return (
		<ModalContent className="min-w-[348px]" withFooter={false}>
			<ModalTitle>
				<>Verify email</>
			</ModalTitle>
			<Label1 className="mt-4 text-base font-normal text-white/[.7]">
				{t('modals.enterCode.text')} <span className="text-white">{email}</span>
			</Label1>
			<Title4 className="text-accentPrimary cursor-pointer text-base font-normal" onClick={onEmailChange}>
				{t('modals.enterCode.actions.changeEmail')}
			</Title4>
			<OtpInput
				isInputNum
				inputStyle="!w-full h-full bg-[rgba(255,255,255,0.08)] rounded-lg font-spacemono font-normal text-xl leading-6 text-foregroundPrimary border-1 border-transparent focus:!border-accentPrimary !ring-0 focus:!ring-0 transition-[border,background] duration-150"
				focusStyle={
					'border-accentPrimary border-2 !caret-[rgba(252,121,0,1)] !shadow-[0_0px_0px_2px_rgba(252,121,0,0.2)] bg-[rgba(249,143,14,0.08)]'
				}
				className="flex-1"
				containerStyle="h-[56px] mt-6 w-full flex gap-[10px]"
				value={otp}
				onChange={handleChange}
				numInputs={numInputs}
				errorStyle="!border-accentNegative"
				hasErrored={isErrored}
				separator={''}
				shouldAutoFocus
			/>
			{isOtpFulfilled ? (
				<GradientButton className="mt-4 h-[56px] !rounded-lg" onClick={handleSubmit} ref={buttonRef}>
					<div className="flex w-full items-center justify-center gap-3">
						<span className="text-foregroundPrimary text-base font-bold">{t('modals.enterCode.actions.verify')}</span>
						<Arrow />
					</div>
				</GradientButton>
			) : (
				<Button
					className={cn(
						'mt-4 h-[56px] w-full rounded-2xl !rounded-lg py-4 px-6',
						secondsBeforeResend > 0
							? 'pointer-events-none bg-[rgba(255,255,255,0.08)] opacity-50'
							: 'bg-gradient-to-r from-[#0092FC] to-[#0047FC] shadow-[0_5.43046px_60px_rgba(1,117,252,0.4)] transition-all hover:shadow-[0_5.43046px_60px_rgba(1,117,252,0.6)]'
					)}
					size="lg"
					disabled={secondsBeforeResend > 0}
					color="accentPrimary"
					onClick={secondsBeforeResend > 0 ? undefined : handleResendCode}
				>
					<div className="flex w-full items-center justify-center gap-3">
						<span
							className={cn('text-foregroundPrimary w-full text-center text-base font-bold leading-6', {
								'!w-max text-start': secondsBeforeResend <= 0
							})}
						>
							{secondsBeforeResend > 0
								? t('modals.enterCode.resendText', { timing: String(secondsBeforeResend).padStart(2, '0') })
								: t('modals.enterCode.actions.resend')}
						</span>
						{secondsBeforeResend <= 0 && <Arrow />}
					</div>
				</Button>
			)}
		</ModalContent>
	);
};
