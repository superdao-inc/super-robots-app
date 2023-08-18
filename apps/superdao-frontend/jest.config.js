const nextJest = require('next/jest');

/** @type {import('jest').Config} */
const config = {
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/src/$1'
	},
	// transformIgnorePatterns: [`/node_modules/(?!uuid/)`],
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '@testing-library/jest-dom/extend-expect'],
	moduleDirectories: ['node_modules', '<rootDir>/'],
	bail: Boolean(process.env.CI)
};

const resultConfig = nextJest({
	dir: './',
});

module.exports = async function jestConfig() {
	const nextJestConfig = await resultConfig(config)();

	nextJestConfig.transformIgnorePatterns[0] = '/node_modules/(?!uuid/)/';

	return nextJestConfig;
};
