/**
 * Get root element for portal (with fallback for SSR)
 * */
export const getDomContainer = (defaultContainer?: Element | null) => {
	if (defaultContainer) {
		return defaultContainer;
	}

	return typeof document !== 'undefined' ? document.body : null;
};
