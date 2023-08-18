import noop from 'lodash/noop';
import { useRouter } from 'next/router';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';

import { useSwitch } from 'src/hooks';
import { usePrevious } from 'src/hooks/usePrevious';

type OpenAuthModalOptions = {
	onSuccess(): void;
	onClose?: (() => void) | null;
};

type AuthModalContextValue = {
	authModalIsShown: boolean;
	needAuth: boolean;
	openAuthModalOptions: OpenAuthModalOptions;
	openAuthModal(options?: Partial<OpenAuthModalOptions>): void;
	closeAuthModal(): void;
};

export const AuthModalContext = createContext<AuthModalContextValue>({
	authModalIsShown: false,
	needAuth: false,
	openAuthModalOptions: { onSuccess: noop },
	openAuthModal: noop,
	closeAuthModal: noop
});

type AuthModalProviderProps = PropsWithChildren<{ needAuth?: boolean }>;

export const AuthModalProvider = ({ needAuth = false, children }: AuthModalProviderProps) => {
	const { pathname, events } = useRouter();

	const prevPathname = usePrevious(pathname);
	const [authModalIsShown, modal] = useSwitch(needAuth);
	const [openAuthModalOptions, setOpenAuthModalOptions] = useState<OpenAuthModalOptions>({ onSuccess: modal.off });

	// Handle route changes
	useEffect(() => {
		if (pathname === prevPathname) return;

		if (needAuth) {
			setOpenAuthModalOptions({ onSuccess: modal.off, onClose: null });
			if (!authModalIsShown) modal.on();
		} else {
			if (authModalIsShown) modal.off();
		}
	}, [authModalIsShown, modal, needAuth, pathname, prevPathname]);

	// Close modal when route start change on public page
	useEffect(() => {
		const handleRouteChangeStart = () => {
			if (!needAuth) modal.off();
		};

		events.on('routeChangeStart', handleRouteChangeStart);

		return () => {
			events.off('routeChangeStart', handleRouteChangeStart);
		};
	}, [authModalIsShown, events, modal, needAuth]);

	/**
	 * Open modal with default options for client-side routing
	 */
	const openAuthModal = useCallback(
		(options?: Partial<OpenAuthModalOptions>) => {
			const nextOptions: OpenAuthModalOptions = { onSuccess: options?.onSuccess ?? modal.off };
			if (options?.onClose !== null) nextOptions.onClose = options?.onClose || modal.off;

			setOpenAuthModalOptions(nextOptions);
			modal.on();
		},
		[modal]
	);

	const value = {
		authModalIsShown,
		needAuth,
		openAuthModalOptions,
		openAuthModal,
		closeAuthModal: modal.off
	};

	return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>;
};

export const useAuthModal = (): Omit<AuthModalContextValue, 'openAuthModalOptions'> => {
	const context = useContext(AuthModalContext);

	if (!context) throw new Error('"useAuthModal" can not be used outside "AuthModalProvider"');

	const { openAuthModalOptions: _, ...rest } = context;

	return rest;
};
