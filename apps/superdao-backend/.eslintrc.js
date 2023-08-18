module.exports = {
	root: true,
	extends: '@sd/eslint-config-superdao',
	rules: {
		'no-console': 'error'
	},
	ignorePatterns: [
		"scripts",
		"generate-schema.ts"
	]
};
