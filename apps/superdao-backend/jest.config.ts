export default {
	moduleFileExtensions: ['js', 'json', 'ts'],
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/$1'
	},
	rootDir: 'src',
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest'
	},
	collectCoverageFrom: ['**/*.(t|j)s', '!**/node_modules/**'],
	coverageDirectory: '../coverage',
	testEnvironment: 'node'
};
