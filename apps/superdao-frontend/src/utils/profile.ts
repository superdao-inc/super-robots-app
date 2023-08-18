import { UserBySlugQuery } from 'src/gql/user.generated';

export const isUserProfileFilled = (
	user: Pick<UserBySlugQuery['userBySlug'], 'displayName' | 'bio' | 'email' | 'slug' | 'links'>
) => {
	const areFieldsFilled = (['displayName', 'bio', 'email', 'slug'] as const).some((property) =>
		Boolean(user[property])
	);

	const areLinksFilled =
		user.links.site || user.links.twitter || user.links.instagram || user.links.discord || user.links.telegram;

	return areFieldsFilled || areLinksFilled;
};
