export type ActionsProps = {
	isUserEligible: boolean;
	isUserInWaitlist: boolean;
	isUserMinted: boolean;
	isMintTurnedOff: boolean;
	isLoading: boolean;
	isChecking: boolean;
	isAuthorized: boolean;
	handleMint: () => void;
	handleAuth: () => void;
	isInviteFlowOn?: boolean;
};
