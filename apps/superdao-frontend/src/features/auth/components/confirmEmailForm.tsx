import { useForm } from 'react-hook-form';
import { FC, useCallback, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { EMAIL_REGEX, ERROR_EMAIL_ALREADY_REGISTERED } from '@sd/superdao-shared';
import { CheckIcon, DangerIcon, Input, ModalTitle, Title4, toast } from 'src/components';
import { ModalContent } from 'src/components/baseModal';
import { colors } from 'src/style';
import { Arrow } from 'src/components/assets/icons/arrow';
import { GradientButton } from './gradientButton';

export const ConfirmEmailForm: FC<{
	onEmailSend: (email: string, onError: (error: string | null) => void) => void;
	isSendingEmail: boolean;
	isSendingVerefication: boolean;
	isUserLoading: boolean;
}> = ({ onEmailSend, isSendingEmail, isSendingVerefication, isUserLoading }) => {
	const { t } = useTranslation();
	const form = useForm<{ email: string }>({
		mode: 'onChange',
		defaultValues: { email: '' }
	});
	const { handleSubmit, formState, register, setError, trigger, getValues } = form;
	const { isDirty, errors } = formState;
	const onError = useCallback(
		(error: string | null) => {
			if (error === ERROR_EMAIL_ALREADY_REGISTERED) {
				setError('email', { message: 'This email is already linked to another account' });
				return;
			}
			toast.error(t('pages.email.verification.modal.error'));
		},
		[setError, t]
	);
	const handleSend = () => {
		onEmailSend(getValues()?.email, onError);
	};

	useEffect(() => {
		trigger();
	}, [trigger]);

	return (
		<ModalContent
			withFooter={false}
			className={cn('w-[400px]', errors?.email?.message ? '960:h-[342px]' : '960:h-[312px]')}
		>
			<ModalTitle>
				<>Verify email</>
			</ModalTitle>
			<Title4 className="max-w-[336px] text-base text-white/[.7]">{t('modals.verifyEmail.text')}</Title4>
			<div className="relative mt-6 mb-4 w-full overflow-hidden p-0">
				<form onSubmit={handleSubmit(handleSend)}>
					<Input
						autoComplete="off"
						errorClassName="static"
						className="py-2 px-2"
						wrapperClassName="!rounded-lg"
						placeholder="example@gmail.com"
						{...register(`email`, {
							required: true,
							pattern: {
								value: EMAIL_REGEX,
								message: t('pages.email.verification.modal.invalidEmail')
							}
						})}
						error={errors?.email?.message?.toString()}
						rightIcon={<RightIconInEmailInput hasErrorMessage={!!errors.email?.message} isDirty={isDirty} />}
					/>
				</form>
			</div>
			<GradientButton
				className="!rounded-lg"
				onClick={isSendingEmail || isSendingVerefication || isUserLoading ? () => {} : handleSubmit(handleSend)}
				isLoading={isSendingEmail || isSendingVerefication || isUserLoading}
			>
				<div className="flex w-full items-center justify-center gap-3">
					<span className="text-foregroundPrimary text-base font-bold">Verify</span>
					<Arrow />
				</div>
			</GradientButton>
		</ModalContent>
	);
};

type RightIconInEmailInputProps = {
	isDirty: boolean;
	hasErrorMessage: boolean;
};

const RightIconInEmailInput = (props: RightIconInEmailInputProps) => {
	const { isDirty, hasErrorMessage } = props;
	if (!isDirty) {
		return null;
	}

	if (hasErrorMessage) return <DangerIcon fill={colors.accentNegative} width={20} height={20} />;

	return <CheckIcon fill={colors.accentPositive} width={20} height={20} />;
};
