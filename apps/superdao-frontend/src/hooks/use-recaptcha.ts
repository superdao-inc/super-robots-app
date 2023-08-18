import { useCallback, useEffect, useRef } from 'react';
import { recaptchaSiteKey } from 'src/constants';

export const useRecaptcha = () => {
	const recaptchaRef = useRef(null);

	useEffect(() => {
		const head = document.getElementsByTagName('head')[0];
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.defer = true;
		script.onload = function () {
			(window as any).grecaptcha.ready(() => (recaptchaRef.current = (window as any).grecaptcha));
		};
		script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;

		if (!(window as any).grecaptcha) {
			head.appendChild(script);
		}
		return () => script.remove();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const resetRecaptcha = useCallback(() => {
		if (!(window as any).grecaptcha) {
			console.error('Recaptcha script is not available');
		}

		try {
			const { getResponse, reset } = (window as any).grecaptcha;
			if (getResponse()) {
				reset();
			}
		} catch (e) {}
	}, []);

	const executeRecaptcha = useCallback(() => {
		return new Promise<string>((resolve, reject) => {
			try {
				(window as any).grecaptchaTokenResponse = (token: string) => {
					resolve(token);
				};
				(recaptchaRef.current as any).execute();
			} catch (e) {
				reject(e);
			}
		});
	}, []);

	return { executeRecaptcha, resetRecaptcha };
};
