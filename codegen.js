const path = require('path');

const onlyFrontend = process.env.CODEGEN_ONLY_FRONTEND;
const onlyTest = process.env.CODEGEN_ONLY_TEST;

const SUPERDAO_UI_TESTS = 'apps/superdao-ui-tests/src';
const SUPERDAO_FRONTEND = 'apps/superdao-frontend/src';
const SUPERDAO_BACKEND = 'apps/superdao-backend/src';

const superdaoFolders = onlyTest
	? [SUPERDAO_UI_TESTS]
	: onlyFrontend
		? [SUPERDAO_FRONTEND]
		: [SUPERDAO_FRONTEND, SUPERDAO_UI_TESTS];

const config = {
	[SUPERDAO_FRONTEND]: {
		documents: path.join(SUPERDAO_FRONTEND, '**/gql/*.graphql'),
		preset: 'near-operation-file',
		presetConfig: {
			extension: '.generated.ts',
			baseTypesPath: 'types/types.generated.ts'
		},
		plugins: {
			add: {
				content: '// @ts-nocheck'
			},
			'typescript-operations': {},
			'typescript-react-query': {}
		},
		config: {
			skipTypename: true,
			avoidOptionals: true,
			addInfiniteQuery: true,
			exposeQueryKeys: true,
			exposeFetcher: true,
			isReactHook: false,
			fetcher: 'src/client/gqlApi#requestWrapper'
		}
	},
	[SUPERDAO_UI_TESTS]: {
		documents: path.join(SUPERDAO_UI_TESTS, '**/gql/*.graphql'),
		preset: 'near-operation-file',
		presetConfig: {
			extension: '.generated.ts',
			baseTypesPath: 'types/types.generated.ts'
		},
		plugins: {
			add: {
				content: '// @ts-nocheck'
			},
			'typescript-operations': {},
			'typescript-graphql-request': {}
		}
	}
};

module.exports = {
	schema: './apps/superdao-backend/schema.gql',
	generates: superdaoFolders.reduce(
		(prev, folder) => ({
			...prev,
			[path.join(folder, 'types/types.generated.ts')]: {
				config: {
					withHooks: true
				},
				plugins: {
					typescript: {},
					add: {
						content: '/* eslint-disable no-shadow */'
					}
				}
			},
			[folder]: config[folder]
		}),
		{}
	),
};
