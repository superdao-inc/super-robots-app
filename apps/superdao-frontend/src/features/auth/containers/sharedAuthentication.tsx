import { PublicUserFragment } from 'src/gql/user.generated';
import { useAuthWithWallet } from 'src/features/auth/hooks/useAuthWithWallet';

import { WalletType } from 'src/types/wallet';
import { AuthenticationOptions } from './authenticationOptions';

type Props = {
	onSuccess?: (user?: PublicUserFragment) => any;
};

export const SharedAuthentication = ({ onSuccess }: Props) => {
	const { mutate: authWithWallet, isLoading: isAuthWithWalletLoading } = useAuthWithWallet();

	const isLoading = isAuthWithWalletLoading;

	const handleAuthWithWallet = (walletType: WalletType) => () => {
		authWithWallet(walletType, { onSuccess });
	};

	return <AuthenticationOptions onAuthWithWallet={handleAuthWithWallet} isLoading={isLoading} />;
};
