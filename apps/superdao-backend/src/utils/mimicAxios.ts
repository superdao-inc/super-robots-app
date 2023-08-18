import { AxiosResponse } from 'axios';

export const mimicAxiosResponse = (data: any): AxiosResponse => ({
	data,
	status: 200,
	statusText: '',
	headers: {},
	config: {}
});
