import { Injectable } from '@nestjs/common';

const interestsMapping = {
	defi: 'interest:defi',
	art: 'interest:culture',
	gaming: 'interest:gaming',
	programming: 'interest:programming',
	music: 'interest:culture',
	luxury: 'interest:culture',
	photography: 'interest:culture',
	fashion: 'interest:culture'
};

@Injectable()
export class BabyRobotsPreviewHelper {
	constructor() {}

	mapInterests(interests: string[]) {
		return interests.reduce((acc, val) => {
			if (val in interestsMapping) {
				acc[interestsMapping[val as keyof typeof interestsMapping]] = true;
			}

			return acc;
		}, {} as { [key: string]: boolean });
	}
}
