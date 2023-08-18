module.exports = {
	"parser": "@typescript-eslint/parser",
	"plugins": ["lodash", "import", "unused-imports", "turbo"],
	"extends": [
		"plugin:import/typescript",
		"plugin:lodash/recommended",
		"plugin:prettier/recommended",
		"prettier"
	],
	"ignorePatterns": ["*.js"],
	"rules": {
		"turbo/no-undeclared-env-vars": "warn",
		"max-classes-per-file": "off",
		"camelcase": "off",
		"consistent-return": "off",
		"indent": "off",
		"import/extensions": "off",
		"import/no-cycle": "off",
		"import/prefer-default-export": "off",
		"lodash/prefer-constant": "off",
		"lodash/prefer-is-nil": "off",
		"lodash/prefer-lodash-method": "off",
		"lodash/prefer-lodash-typecheck": "off",
		"lodash/prefer-noop": "off",
		"lodash/prefer-some": "off",
		"no-tabs": "off",
		"no-underscore-dangle": "off",
		"no-use-before-define": "off",
		"no-useless-constructor": "off",
		"object-curly-newline": "off",

		"implicit-arrow-linebreak": "off",
//		"no-unused-vars": "off", // or
		"@typescript-eslint/no-unused-vars": "off",
		"unused-imports/no-unused-imports": "error",
		"unused-imports/no-unused-vars": [
			"warn",
			{ "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
		],
		"comma-dangle": ["error", "never"],
		"import/order": [
			"warn",
			{
				"pathGroups": [
					{
						"pattern": "~/**",
						"group": "internal"
					}
				],
				"groups": [
					["builtin", "external"],
					["internal", "parent", "sibling", "index", "object"]
				]
			}
		],
		"no-restricted-syntax": "off",
		"no-await-in-loop": "off",
		"no-continue": "off",
		"no-plusplus": "off",
		"no-shadow": "off",
		"class-methods-use-this": "off",
		"no-pause-in-scenario": "off"
	},
	"settings": {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx"]
		},
		"import/resolver": {
			"typescript": {
				"project": ["apps/*/tsconfig.json", "libs/*/tsconfig.json"]
			}
		},
		"import/internal-regex": "^@sd" // Local workspace packages
	}
}
