import { readdirSync, statSync } from 'fs';
import { join } from 'path';

/** Path to 'pages' directory relatively to current file. */
const PAGES_DIR_PATH = '../../../../superdao-frontend/src/pages/';

/**
 * Next.js slug format.
 * @example [slug]
 */
const SLUG_REGEXP = /^\[.*]/;
const isSlug = (value: string) => {
	return SLUG_REGEXP.test(value);
};

const FILE_WITH_EXTENSION_REGEXP = /\.[^/.]+$/;
const removeExtension = (fileName: string) => {
	return fileName.replace(FILE_WITH_EXTENSION_REGEXP, '');
};

/**
 * Returns the absolute path to the file.
 * Is necessary for working with this file.
 * @param nodes files/directories names
 */
const getFullPath = (...nodes: string[]) => {
	return join(__dirname, PAGES_DIR_PATH, ...nodes);
};

/**
 * Reads file system and creates the forbidden slags map.
 * @throws exception if any IO error occurs.
 * @param slugPathMap
 */
export const _getForbiddenSlugs = (slugPathMap: Record<string, string>): Record<string, string[]> => {
	const forbiddenSlugs: Record<string, string[]> = {};

	for (const [slug, path] of Object.entries(slugPathMap)) {
		forbiddenSlugs[slug] = [];

		/** Dir nodes are files and directories.*/
		const dirNodes = readdirSync(getFullPath(path));

		for (let nodeName of dirNodes) {
			if (isSlug(nodeName)) continue;

			const isFile = statSync(getFullPath(path, nodeName)).isFile();
			if (isFile) {
				nodeName = removeExtension(nodeName);
			}

			forbiddenSlugs[slug].push(nodeName);
		}
	}

	return forbiddenSlugs;
};
