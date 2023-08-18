import noop from 'lodash/noop';
import { memo, useContext } from 'react';
import { Modal, ModalContent } from 'src/components/baseModal';

import { SharedAuthentication } from '../../containers/sharedAuthentication';
import { AuthModalContext } from '../../context/authModalContext';

const AuthModal = () => {
	const { authModalIsShown, openAuthModalOptions } = useContext(AuthModalContext);
	const { onClose, onSuccess } = openAuthModalOptions;

	return (
		<Modal isOpen={authModalIsShown} withCloseIcon={!!onClose} onClose={onClose ?? noop}>
			<ModalContent withFooter={false}>
				<div className="relative my-auto min-h-[200px] w-full overflow-hidden">
					<SharedAuthentication onSuccess={onSuccess} />
				</div>
			</ModalContent>
		</Modal>
	);
};

export default memo(AuthModal);
