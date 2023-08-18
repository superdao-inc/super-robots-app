module.exports = {
	"root": true,
	"plugins": ["@emotion"],
	"extends": [
		"next/core-web-vitals",
		"airbnb/hooks",
		"@sd/eslint-config-superdao",
	],
	"rules": {
		"react/jsx-uses-react": "off",
		"react/react-in-jsx-scope": "off",
		"react/prop-types": "off",
		"react/jsx-key": [
			"error",
			{
				"checkFragmentShorthand": true
			}
		],
		"react/jsx-indent": [
			"error",
			"tab"
		],
		"react/require-default-props": "off",
		"react/jsx-indent-props": [
			"error",
			"tab"
		],
		"react/jsx-filename-extension": "off",
		"react/display-name": "warn",
		"react/function-component-definition": "off",
		"react/jsx-wrap-multilines": "off",
		"react/jsx-props-no-spreading": "off",
		"react/jsx-one-expression-per-line": "off",
		"react/jsx-curly-newline": "off",
		"@next/next/no-img-element": "off",
		"jsx-a11y/anchor-is-valid": "off",
		"jsx-a11y/click-events-have-key-events": "off",
		"jsx-a11y/no-noninteractive-element-interactions": "off",
		"jsx-a11y/alt-text": "off",
		"jsx-a11y/label-has-associated-control": "off",
		"jsx-a11y/no-static-element-interactions": "off",
		"@emotion/pkg-renaming": "error",
		// next/image might not be yet a good move as of NextJs v11.
		// https://github.com/vercel/next.js/discussions/16832
		"react/no-unused-prop-types": "warn",
	},
	"overrides": [
		{
			"files": ["*.generated.ts"],
			"rules": {
				"no-undef": "off"
			}
		}
	]
}
