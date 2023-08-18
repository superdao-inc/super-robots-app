import { FileInfo } from '@uploadcare/react-widget';

const CDN_URL = 'https://ucarecdn.com';
export const UPLOADCARE_PUBLIC_KEY = '2a9360951ec7e6ef0340';

export const getOptimizedFileUrl = (id: string) => `${CDN_URL}/${id}/-/preview/-/quality/smart/`;
// Looks like hardcoding .jpg is not a problem here, png doesn't have any background anyway after dowloading
export const getDownloadFileUrl = (id: string) => `${CDN_URL}/${id}/-/preview/-/inline/no/${id}.jpg`;

// add crop to file to save user input
export const enrichFileUUID = (fileUUID: FileInfo['uuid'], fileCrop: FileInfo['crop']) => {
	if (!fileCrop) return `${fileUUID}`;

	return `${fileUUID}/-/crop/${fileCrop.width}x${fileCrop.height}/${fileCrop.left},${fileCrop.top}`;
};
