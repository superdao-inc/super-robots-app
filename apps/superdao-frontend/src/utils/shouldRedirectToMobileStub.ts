import { isMobile } from 'is-mobile';

const pagesWithMobileStub: string[] = [];

export const shouldRedirectToMobileStub = (pathname: string) => {
	const pageHasMobileStub = pagesWithMobileStub.includes(pathname);

	return isMobile() && pageHasMobileStub;
};
