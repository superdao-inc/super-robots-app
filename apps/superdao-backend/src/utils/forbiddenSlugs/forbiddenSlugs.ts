import forbiddenSlugsJSON from './forbiddenSlugs.generated.json';

export type Slug = keyof typeof forbiddenSlugsJSON;

/* Is used to protect from the type error that occurs when some value in the generated file is an empty array [].
 * Error message:
 * TS2345: Argument of type 'string' is not assignable to parameter of type 'never'.
 * */
export const forbiddenSlugs = forbiddenSlugsJSON as Record<Slug, string[]>;

/**
 * /api/* route is used for superdao services.
 * @example Preview Generator that uses the route '/api/dao-claim-preview'
 */
const extraForbiddenDaoSlugs = ['api'];

export const forbiddenDaoSlugs = [...forbiddenSlugs.daoSlugs, ...extraForbiddenDaoSlugs];

export const forbiddenUserSlugs = forbiddenSlugs.userSlugs;

export const forbiddenTierNames = forbiddenSlugs.tierNames;
