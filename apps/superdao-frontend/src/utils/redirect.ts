export const withBackToPageAuthRedirect = (url?: string) => ({
	redirect: {
		destination: `/auth/login${url ? `/${encodeURIComponent(url)}` : ''}`,
		permanent: false
	}
});
