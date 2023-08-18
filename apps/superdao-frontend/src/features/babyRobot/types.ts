import { ScoringAudienceItem } from 'src/types/types.generated';

export type RobotPreview = {
	targetImage: string | undefined;
	styleId: string;
	layers: string[];
	vector: string[];
	scoringAudienceItem: ScoringAudienceItem | null;
};
