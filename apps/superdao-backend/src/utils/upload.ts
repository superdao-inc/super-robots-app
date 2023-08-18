import { UploadClient } from '@uploadcare/upload-client';
import { config } from 'src/config';

export const uploadClient = new UploadClient({
	publicKey: config.keys.uploadcarePublicKey
});

// remove crop from file identificator
export const extractFileUUID = (file: string) => {
	return file.split('/-')[0];
};

export const validateFile = async (fileId: string) => {
	try {
		const fileData = await uploadClient.info(extractFileUUID(fileId));

		return fileData.isStored; // file will not expire in 24 hours
	} catch (e) {
		return false;
	}
};

export const validateFiles = async (fileIds: string[]) => {
	const result = await Promise.all(fileIds.map((fileId) => validateFile(fileId)));

	return result.every((item) => item);
};

export const validateWhitelistUrl = (url: string) => {
	const linkRegExp = /(https?:\/\/[^\s]+)/g;

	return linkRegExp.test(url);
};
