import { ScoringAudienceItem } from 'src/entities/babyRobot/babyRobot.dto';

export type RobotImageGenerationEntry = {
	withMint: boolean;
	scoringAudienceItem: ScoringAudienceItem;
	feedbackLayer: boolean;
	walletAddress: string;
	imageNameSha: string;
	mintId?: string;
	userId?: string;
	email?: string;
	withTokenUpdate?: boolean;
	tokenId?: string | null;
};
