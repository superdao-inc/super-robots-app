import { AuthModal } from './components/AuthModal';
import { ModalSocialWaiting } from './containers/modalSocialWaiting';
import { AuthenticationOptions } from './containers/authenticationOptions';
import { SharedAuthentication } from './containers/sharedAuthentication';
import { AuthModalProvider, useAuthModal } from './context/authModalContext';

export const AuthUI = {
	AuthModal,
	AuthModalProvider,
	AuthenticationOptions,
	ModalSocialWaiting,
	SharedAuthentication,
	useAuthModal
};
