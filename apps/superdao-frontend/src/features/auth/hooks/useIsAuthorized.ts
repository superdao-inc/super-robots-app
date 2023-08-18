import { useCurrentUserQuery } from 'src/gql/user.generated';

export const useIsAuthorized = () => {
	const { data } = useCurrentUserQuery();

	return Boolean(data?.currentUser.id);
};
