import { dehydrate, QueryClient } from 'react-query';
import {
	GetServerSidePropsContext,
	Redirect,
	GetServerSideProps,
	GetServerSidePropsResult,
	GetStaticPropsContext
} from 'next';
import session from 'cookie-session';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import absoluteUrl from 'next-absolute-url';
import { FEATURES, userPlaceholder } from '@sd/superdao-shared';

import { AppError } from 'src/services/errors';
import { CurrentUserQuery, UserByIdQuery, UserBySlugQuery } from 'src/gql/user.generated';

import { UserAPI } from 'src/features/user';
import { daosRedirect } from 'src/utils/redirects';
import { withBackToPageAuthRedirect } from 'src/utils/redirect';
import { useGetCodeInvitationsInfoByCodeQuery, useGetCodeInvitationsInfoQuery } from 'src/gql/userCodes.generated';

type Props = { [key: string]: any };
export type SSRContext = GetServerSidePropsContext & { currentUser?: UserBySlugQuery['userBySlug'] };
type SSRMiddleware = (ctx: SSRContext) => Promise<GetServerSidePropsResult<Props> | undefined>;

const sessionMiddleware = session({
	keys: [process.env.SESSION_KEY || '']
});

export const preloadCodeInvitationData = async (ctx: GetServerSidePropsContext) => {
	const { req } = ctx;

	const headers = { cookie: req.headers.cookie || '' };
	const response = await useGetCodeInvitationsInfoQuery.fetcher({}, headers)();

	const defaultRepsonse = {
		isCodeFlowAvailable: false,
		remainingCodeActivations: 0,
		maxCodeActivations: 0,
		code: ''
	};

	try {
		const { isCodeFlowAvailable, remainingCodeActivations, maxCodeActivations, code } =
			response?.getCodeInvitationsInfo ?? defaultRepsonse;

		return { isCodeFlowAvailable, remainingCodeActivations, maxCodeActivations, code };
	} catch (e) {
		return defaultRepsonse;
	}
};

export const preloadCodeInvitationDataByCode = async (ctx: GetServerSidePropsContext, code: string) => {
	const { req } = ctx;

	const headers = { cookie: req.headers.cookie || '' };
	const response = await useGetCodeInvitationsInfoByCodeQuery.fetcher(
		{ getCodeInvitationsInfoByCodeInput: { code } },
		headers
	)();

	const defaultRepsonse = {
		isCodeFlowAvailable: false,
		remainingCodeActivations: 0,
		maxCodeActivations: 0,
		code: '',
		codeOwner: ''
	};

	try {
		const { isCodeFlowAvailable, remainingCodeActivations, maxCodeActivations, code, codeOwner } =
			response?.getCodeInvitationsInfoByCode ?? defaultRepsonse;

		return { isCodeFlowAvailable, remainingCodeActivations, maxCodeActivations, code, codeOwner };
	} catch (e) {
		return { error: true };
	}
};

export const prefetchData = async (ctx: GetServerSidePropsContext) => {
	const userId = ctx.req.session?.userId;
	const isAuthorized = !!userId;

	const queryClient = new QueryClient();

	if (isAuthorized) {
		const headers = { cookie: ctx.req.headers.cookie || '' };

		const { currentUser } = (await UserAPI.useCurrentUserQuery.fetcher({}, headers)()) || {};

		AppError.assert(currentUser, 'User not found', {
			payload: { tags: { team: 'CORE', section: 'Auth' } }
		});

		queryClient.setQueryData<CurrentUserQuery>(UserAPI.useCurrentUserQuery.getKey(), { currentUser });
		queryClient.setQueryData<UserByIdQuery>(UserAPI.useUserByIdQuery.getKey({ id: currentUser.id }), {
			userById: currentUser
		});
	} else {
		queryClient.setQueryData<CurrentUserQuery>(UserAPI.useCurrentUserQuery.getKey(), {
			currentUser: userPlaceholder()
		});
		queryClient.setQueryData<UserBySlugQuery>(UserAPI.useUserBySlugQuery.getKey({ userslug: '' }), {
			userBySlug: userPlaceholder()
		});
		queryClient.setQueryData<UserByIdQuery>(UserAPI.useUserByIdQuery.getKey({ id: '' }), {
			userById: userPlaceholder()
		});
	}

	// https://github.com/tannerlinsley/react-query/issues/1458
	const getProps = () => ({ dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))) });

	return [queryClient, getProps, isAuthorized] as const;
};

type CheckAuthResult = [{ redirect: Redirect }, undefined] | [undefined, UserByIdQuery['userById']];
type RedirectOptions = { from: string | string[]; to?: string | string[] };

const getRedirectResult = ({ from, to }: RedirectOptions): CheckAuthResult => {
	const params = new URLSearchParams();
	if (typeof from === 'string') params.set('from', from);
	if (typeof to === 'string') params.set('to', to);
	const paramsStr = params.toString();

	const redirect = {
		destination: `/auth/login${paramsStr.length ? `?${paramsStr}` : ''}`,
		permanent: false
	};

	return [{ redirect }, undefined];
};

export const checkAuth = async (ctx: GetServerSidePropsContext): Promise<CheckAuthResult> => {
	const {
		resolvedUrl,
		query: { from: fromQuery, to },
		req
	} = ctx;
	const headers = { cookie: req.headers.cookie || '' };
	const { userId } = req.session ?? {};

	const from = fromQuery ?? resolvedUrl;

	if (!userId) return getRedirectResult({ from, to });

	const { userById } = (await UserAPI.useUserByIdQuery.fetcher({ id: userId }, headers)()) || {};
	if (!userById) return getRedirectResult({ from, to });

	return [undefined, userById];
};

export const checkCurrentUserAuth = async (
	ctx: GetServerSidePropsContext,
	userIdOrSlug: string
): Promise<CheckAuthResult> => {
	const [authRedirect, user] = await checkAuth(ctx);
	if (authRedirect) return [authRedirect, undefined];

	const redirect = {
		redirect: { destination: '/', permanent: false }
	};

	if (!user || userIdOrSlug !== user.slug) return [redirect, undefined];

	return [undefined, user];
};

export const checkSupervisorAuth = async (ctx: GetServerSidePropsContext): Promise<CheckAuthResult> => {
	const [_, user] = await checkAuth(ctx);
	if (!user?.isSupervisor) return [daosRedirect, undefined];

	return [undefined, user];
};

const enrichContextWithUserData = async (ctx: SSRContext) => {
	const userId = ctx.req.session?.userId;
	if (!userId) return;

	const headers = { cookie: ctx.req.headers.cookie || '' };

	const { userById } = (await UserAPI.useUserByIdQuery.fetcher({ id: userId }, headers)()) || {};
	if (!userById) return;

	ctx.currentUser = userById;
};

/**
 * SSR utils
 */

/**
 * Wrapper function for NextPage params tipping.
 *
 * Allows you to additionally pass handler functions,
 * in which data for react-query or other information will be loaded.
 *
 * Each of the functions can additionally return redirect or notFound, which will be processed in priority.
 *
 * @param middlewares
 * @constructor
 */

export const SSR = (...middlewares: SSRMiddleware[]): GetServerSideProps => {
	return async (ctx: SSRContext) => {
		const hostname = getHostname(ctx);
		const translations = await getTranslationProps(ctx);

		sessionMiddleware(ctx.req as any, ctx.res as any, () => void 0);

		// Adds current user to context at any page if user is authorized
		await enrichContextWithUserData(ctx);

		const features = {
			[FEATURES.CORE_GASLESS]: false // deprecatedFeatureToggles.isEnabled(FEATURES.CORE_GASLESS)
		};

		const props = { hostname, features, ...translations } as any;

		const { nextAttemptToSendEmail } = ctx.req.session ?? {};
		if (nextAttemptToSendEmail) {
			props.nextAttemptToSendEmail = nextAttemptToSendEmail;
		}
		for (const middleware of middlewares) {
			const middlewareResult = await middleware(ctx);

			if (middlewareResult === undefined) continue;

			// Redirects
			if ('redirect' in middlewareResult || 'notFound' in middlewareResult) return middlewareResult;

			// Merge props
			if ('props' in middlewareResult) {
				Object.assign(props, middlewareResult.props);
			}
		}
		return { props };
	};
};

export const SSRAuthMiddleware = async (ctx: SSRContext) => {
	const [authRedirect] = await checkAuth(ctx);
	// strips the "_next/data" prefix
	if (authRedirect) return withBackToPageAuthRedirect(ctx.resolvedUrl);

	return undefined;
};

export const getTranslationProps = async (ctx: SSRContext | GetStaticPropsContext, addNamespaces?: string[]) => {
	let namespaces = ['common'];

	if (addNamespaces !== undefined) {
		namespaces = [...namespaces, ...addNamespaces];
	}

	return {
		...(await serverSideTranslations(ctx.locale || 'en', namespaces))
	};
};

export const getHostname = (ctx: GetServerSidePropsContext) => {
	const data = absoluteUrl(ctx.req);

	return data.host;
};

export * from './queryUtils';
