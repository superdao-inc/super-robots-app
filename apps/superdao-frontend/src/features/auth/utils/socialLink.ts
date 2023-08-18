import { OAuthProvider, OpenIDConnectUserInfo } from '@magic-ext/oauth';

export const getSocialLink = (provider: OAuthProvider, userOauthInfo: OpenIDConnectUserInfo): string | null => {
	const { sources } = userOauthInfo;
	if (!sources) return null;

	const key = Object.keys(sources).find((key) => key.includes(provider));
	const source = key ? sources[key] : {};

	switch (provider) {
		case 'discord': {
			const { id = null } = source;

			return id ? `https://discordapp.com/users/${id}` : null;
		}

		case 'facebook': {
			const { id = null } = source;

			return id ? `https://www.facebook.com/profile.php?id=${id}` : null;
		}

		case 'twitter': {
			const { screen_name = null } = source;

			return screen_name ? `https://twitter.com/${screen_name}` : null;
		}

		default:
			return null;
	}
};
