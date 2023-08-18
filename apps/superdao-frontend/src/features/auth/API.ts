import {
	useAuthWithWallet,
	useIsAuthorized,
	useAuthNonceMutation,
	useAuthSignatureMutation,
	useLogout,
	useMetamaskAccountChange
} from './hooks';

export const AuthAPI = {
	useAuthWithWallet,
	useIsAuthorized,
	useAuthNonceMutation,
	useAuthSignatureMutation,
	useLogout,
	useChangeAccount: useMetamaskAccountChange
};
