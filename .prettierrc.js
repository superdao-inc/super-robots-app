module.exports = {
  "plugins": [
    require("prettier-plugin-tailwindcss")
  ],
  "printWidth": 120,
  "useTabs": true,
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "trailingComma": "none",
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  "overrides": [
    {
      "files": ".devops/**",
      "options": {
        "useTabs": false,
        "tabWidth": 2
      }
    }
  ]
}
