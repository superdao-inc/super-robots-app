import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { configureScope } from '@sentry/nextjs';

import { useLogoutMutation } from 'src/features/auth/hooks/useLogoutMutation';
import { AppError } from 'src/services/errors';
import { UserSession } from 'src/services/UserSession';

export const useLogout = (redirect: string = '/', noRedirect?: boolean, withReload?: boolean) => {
	const { push } = useRouter();
	const queryClient = useQueryClient();
	return useLogoutMutation({
		onSuccess: async () => {
			await queryClient.resetQueries();
			configureScope((scope) => scope.setUser(null));
			UserSession.removeUserWallet();

			if (withReload) {
				location.reload();
				return;
			}

			if (noRedirect) return;

			await push(redirect);
		},
		onError: async (error) => {
			AppError.capture(error, {
				payload: { tags: { team: 'CORE', section: 'Auth' } },
				options: { silent: true }
			});
		}
	});
};
