import { useRouter } from 'next/router';
import { useAuthModal } from 'src/features/auth/context/authModalContext';
import { useGetUserRobotsTokenIdsMutation } from 'src/gql/babyRobot.generated';

export const useLoginWithRedirectToOwnedRobots = () => {
	const { push, pathname } = useRouter();

	const { openAuthModal, closeAuthModal } = useAuthModal();

	const { mutate: getUserRobotsTokenIds } = useGetUserRobotsTokenIdsMutation({});

	const handleAuth = () => {
		openAuthModal({
			onSuccess: () => {
				setTimeout(() => {
					getUserRobotsTokenIds(
						{},
						{
							onSuccess: (data) => {
								// means user is whitelisted
								closeAuthModal();

								if (data.getUserRobotsTokenIds.length && pathname === '/') {
									push('/robots');
								}
							},
							onError: () => {
								// means user is not whitelisted
								closeAuthModal();
							}
						}
					);
				}, 20);
			}
		});
	};

	return { handleAuth };
};
