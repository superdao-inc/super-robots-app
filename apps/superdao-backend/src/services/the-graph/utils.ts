import fetch from 'cross-fetch';

export const fetchWithTimeout = async (input: RequestInfo, opts: RequestInit): Promise<Response> => {
	const timeout = 20000;

	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeout);
	const response = await fetch(input, {
		...opts,
		signal: controller.signal
	});
	clearTimeout(id);
	return response;
};
