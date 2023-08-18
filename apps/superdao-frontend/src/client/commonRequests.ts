import { GetServerSidePropsContext } from 'next';
import { QueryClient } from 'react-query';

import { UserAPI } from 'src/features/user';
import { UserBySlugQueryVariables } from 'src/gql/user.generated';

const getCookieHeaders = (ctx: GetServerSidePropsContext): { cookie: string } => ({
	cookie: ctx.req.headers.cookie || ''
});

export const getUserBySlug = async (
	queryClient: QueryClient,
	ctx: GetServerSidePropsContext,
	variables: UserBySlugQueryVariables
) => {
	const headers = getCookieHeaders(ctx);
	const { userBySlug } = (await UserAPI.useUserBySlugQuery.fetcher(variables, headers)()) || {};

	if (!userBySlug) return null;
	queryClient.setQueryData(UserAPI.useUserBySlugQuery.getKey(variables), { userBySlug });

	return userBySlug;
};
