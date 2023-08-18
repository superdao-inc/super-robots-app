const WALLET_KEY = 'superdao-robot:wallet';

export class UserSession {
	static setUserWallet(wallet: string) {
		localStorage.setItem(WALLET_KEY, wallet);
	}

	static removeUserWallet() {
		localStorage.removeItem(WALLET_KEY);
	}

	static getUserWallet(): string | undefined {
		return localStorage.getItem(WALLET_KEY) ?? undefined;
	}
}
