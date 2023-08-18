export const getIsDaoVerified = (
	treasuryMainWallet: string | null | undefined,
	verificatedDaosTreasuryWallets: string[] | null | undefined
) => {
	if (!treasuryMainWallet || !verificatedDaosTreasuryWallets) return false;

	return verificatedDaosTreasuryWallets.includes(treasuryMainWallet.toLowerCase());
};
