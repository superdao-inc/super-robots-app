import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Loader, toast } from 'src/components';
import { Modal } from 'src/components/baseModal';
import { EmailSettingsAPI } from 'src/features/emailSettings';
import { UserAPI } from 'src/features/user';
import {
	SendEmailVerificationMessageMutation,
	UpdateUserEmailMutation,
	useCheckUserOtpEmailResponseQuery,
	useResetUserOtpAndEmailMutation,
	useUpdateUserEmailMutation
} from 'src/gql/emailSettings.generated';
import { parseGqlErrorMessage } from 'src/utils/errors';
import { useLogout } from '../hooks';
import { ConfirmEmailForm } from './confirmEmailForm';
import { EnterCodeModal } from './enterCodeModal';
import { ERROR_EMAIL_ALREADY_REGISTERED } from '@sd/superdao-shared';

type Props = {
	nextAttemptToSendEmail?: number;
	withClose?: boolean;
	onCodeVerified?: () => void;
};

export const VerifyEmailModal: FC<Props> = ({
	onCodeVerified: handleCodeVerified,
	nextAttemptToSendEmail,
	withClose
}) => {
	const { asPath } = useRouter();
	const queryClient = useQueryClient();

	const [step, setStep] = useState('initial');
	const [email, setEmail] = useState('');
	const [nextAttempt, setNextAttempt] = useState(nextAttemptToSendEmail); // must be in seconds here
	const handleConfirmEmail = useCallback((email: string, nextAttemptToSendEmail: number) => {
		setEmail(email);
		setStep('emailSent');
		setNextAttempt(Math.round((nextAttemptToSendEmail - Date.now()) / 1000)); // in seconds
	}, []);

	const { mutate: logout } = useLogout('', true, true);
	const { mutate: resetEmailAndOTP } = useResetUserOtpAndEmailMutation();

	const setInitialStep = () => setStep('initial');
	const handleChangeEmail = () => {
		setInitialStep();
		resetEmailAndOTP({});
	};

	const { data: checkOtpData, isLoading: isCheckOtpDataLoading } = useCheckUserOtpEmailResponseQuery(
		{},
		{ select: (data) => data.checkUserOTPEmailResponse }
	);
	const { resendTimestamp } = checkOtpData || {};

	useEffect(() => {
		if (resendTimestamp && resendTimestamp > 0) {
			setNextAttempt(resendTimestamp);
			setStep('emailSent');
		}
	}, [resendTimestamp]);

	const handleLogout = () => {
		logout({});
	};

	const { data, isLoading: isUserLoading } = UserAPI.useCurrentUserQuery();
	const { currentUser } = data || {};

	const { mutate: updateEmail, isLoading: isSendingEmail } = useUpdateUserEmailMutation();

	const { mutate: sendVerificationEmail, isLoading: isSendingVerefication } =
		EmailSettingsAPI.useSendEmailVerificationMessageMutation();

	const handleSendEmail = useCallback(
		(submitedEmail: string, onEmailError: (error: string | null) => void) => {
			const onError = (e: any) => {
				const error = parseGqlErrorMessage(e);
				onEmailError(error);
			};
			const updateUserEmailInput = { email: submitedEmail, userPageAnchor: asPath };
			const currentUserEmail = currentUser?.email;

			if (currentUserEmail === submitedEmail) {
				sendVerificationEmail(
					{ sendEmailVerificationMessageInput: { userPageAnchor: asPath } },
					{
						onSuccess: ({
							sendEmailVerificationMessage: { nextAttemptToSendEmail, error }
						}: SendEmailVerificationMessageMutation) => {
							if (!nextAttemptToSendEmail) {
								toast.error(error ?? '');

								return;
							}

							handleConfirmEmail(submitedEmail, nextAttemptToSendEmail);
						},
						onError
					}
				);
			} else {
				updateEmail(
					{ updateUserEmailInput },
					{
						onSuccess: async ({ updateUserEmail: { nextAttemptToSendEmail, error } }: UpdateUserEmailMutation) => {
							if (!nextAttemptToSendEmail) {
								if (error === ERROR_EMAIL_ALREADY_REGISTERED) {
									onError(new Error(error));

									return;
								}

								toast.error(error ?? '');

								return;
							}

							handleConfirmEmail(submitedEmail, nextAttemptToSendEmail);
							await queryClient.refetchQueries('CurrentUser');
						},
						onError
					}
				);
			}
		},
		[asPath, currentUser?.email, handleConfirmEmail, queryClient, sendVerificationEmail, updateEmail]
	);

	if (isCheckOtpDataLoading) {
		return (
			<Modal
				withCloseIcon={withClose}
				onClose={withClose ? handleLogout : undefined}
				isOpen
				style={{
					content: {
						minHeight: '312px',
						minWidth: '300px',
						maxWidth: '400px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}
				}}
			>
				<Loader size="lg" />
			</Modal>
		);
	}

	return (
		<Modal isOpen withCloseIcon={withClose} onClose={withClose ? handleLogout : undefined}>
			{step === 'emailSent' ? (
				<EnterCodeModal
					email={email || currentUser?.email || ''}
					onResendCode={handleSendEmail}
					onCodeExpired={setInitialStep}
					onEmailChange={handleChangeEmail}
					onCodeVerified={handleCodeVerified}
					nextAttemptToSendEmail={nextAttempt}
				/>
			) : (
				<ConfirmEmailForm
					onEmailSend={handleSendEmail}
					isSendingEmail={isSendingEmail}
					isSendingVerefication={isSendingVerefication}
					isUserLoading={isUserLoading}
				/>
			)}
		</Modal>
	);
};
