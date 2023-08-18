import curry from 'lodash/curry';

import { uploadcareParams } from './private';

const fileURLPattern = curry((CDN_URL: string, id: string): string => `${CDN_URL}/${id}`);

const optimizedFileUrlPattern = curry(
	(CDN_URL: string, id: string): string => `${CDN_URL}/${id}/-/preview/-/quality/smart/`
);

const Uploadcare = {
	fileURLByID: fileURLPattern(uploadcareParams.url),
	optimizedFileURLByID: optimizedFileUrlPattern(uploadcareParams.url)
};

export const CDN = { fileURLPattern, optimizedFileUrlPattern, Uploadcare };
