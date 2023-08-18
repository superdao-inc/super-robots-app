const { publicRuntimeConfig } = require('./next.config');

jest.mock('next/config', () => () => ({ publicRuntimeConfig }));

// Mocks for react-slick package
// https://github.com/akiran/react-slick/blob/master/test-setup.js

window.matchMedia ??= function () {
	return {
		matches: false,
		addListener: function () {},
		removeListener: function () {}
	};
};

window.requestAnimationFrame ??= function (callback) {
	setTimeout(callback, 0);
};
