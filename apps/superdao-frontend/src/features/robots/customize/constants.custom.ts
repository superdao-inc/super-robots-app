import { CUSTOMIZE_COLORS } from './constants';

export const customizeCustomElements: {
	type: string;
	name: string;
	index: string;
	color: CUSTOMIZE_COLORS[];
	hasPreview: boolean;
}[] = [
	{
		type: 'FEEDBACK',
		name: 'Earring OG',
		index: 'FEEDBACK_1',
		color: [CUSTOMIZE_COLORS.lime],
		hasPreview: true
	}
];
