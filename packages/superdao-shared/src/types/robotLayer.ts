export enum RANDOM_LAYERS {
	BG = 'BG',
	TUBES = 'TUBES',
	HEAD = 'HEAD',
	EYES = 'EYES',
	BODY = 'BODY',
	LEGS = 'LEGS'
}

export enum PROPERTY_LAYERS {
	FEEDBACK = 'FEEDBACK',
	TWITTER = 'TWITTER',
	ENS = 'ENS',
	LENS = 'LENS',
	MIRROR = 'MIRROR',
	RANK = 'RANK'
}

export type RobotLayer = keyof typeof RANDOM_LAYERS | keyof typeof PROPERTY_LAYERS;
export type RobotLayerMap = Partial<Record<RobotLayer, string>>;

export const ROBOT_PARTS_URL = 'https://storage.googleapis.com/superdao-robots-assets/robot-parts';
export const ANIMATION_ROBOT_IMAGE = 'https://storage.googleapis.com/superdao-robots-assets/robot-animation.mp4';

export const getCurrentPartsVersion = (isUsingOddVersion: boolean) => {
	return isUsingOddVersion ? 'v9' : 'v10';
};

export const getCurrentPartsConfig = (currentVersion: string) => {
	return currentVersion === 'v9'
		? { BG: 6, LEGS: 36, BODY: 64, HEAD: 1, EYES: 17, TUBES: 31 }
		: { BG: 12, LEGS: 36, BODY: 64, HEAD: 1, EYES: 17, TUBES: 31 };
};
