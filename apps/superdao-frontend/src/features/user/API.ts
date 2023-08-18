import {
	useCurrentUserQuery,
	useUpdateUserMutation,
	useIsCurrentUser,
	useUserBySlugQuery,
	useUserByIdQuery
} from './hooks';

export const UserAPI = {
	useCurrentUserQuery,
	useUpdateUserMutation,

	useUserBySlugQuery,
	useIsCurrentUser,
	useUserByIdQuery
};
