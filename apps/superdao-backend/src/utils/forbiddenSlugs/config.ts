/**
 * Some constants used during the code generation.
 */

/**
 * Path relative to file with the generation code.
 * @example generate.ts
 */
export const OUTPUT_FILE = './forbiddenSlugs.generated.json';

/**
 * Fill this object on every 'pages/**' change that affects slugs paths.
 *
 * Object with paths to directories we should get the forbidden slugs in.
 * Specify each slug relatively to the '/pages' directory.
 * The path must point to the same directory where the [slug] is.
 *
 * @example To get forbidden slugs for 'pages/[slug]' specify the path as './'.
 */
export const SLUGS_PATHS_MAP = {
	daoSlugs: './', // forbidden names for 'pages/[slug]'
	userSlugs: './users', // forbidden names for 'pages/users/[idOrSlug]'
	tierNames: './[slug]' // forbidden names for 'pages/[slug][tier]'
};
