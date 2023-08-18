import { useRemoveUserEmailMutation, useSendEmailVerificationMessageMutation } from 'src/gql/emailSettings.generated';

export const EmailSettingsAPI = {
	useRemoveUserEmailMutation,
	useSendEmailVerificationMessageMutation
};
