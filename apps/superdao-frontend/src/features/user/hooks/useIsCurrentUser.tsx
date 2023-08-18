import { useCurrentUserQuery } from 'src/gql/user.generated';
import { AuthAPI } from 'src/features/auth/API';

/**
 * Checks whether the passed idOrSlug is the same as the idOrSlug of the authorized user.
 */
export const useIsCurrentUser = (idOrSlug: string): boolean => {
	const isAuthorized = AuthAPI.useIsAuthorized();

	const { currentUser } = useCurrentUserQuery(undefined, { enabled: isAuthorized })?.data || {};

	if (!isAuthorized || !currentUser) return false;

	return idOrSlug === currentUser.id || idOrSlug === currentUser.slug;
};
