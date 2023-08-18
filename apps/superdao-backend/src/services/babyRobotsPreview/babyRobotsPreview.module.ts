import { forwardRef, Module } from '@nestjs/common';
import { BabyRobotModule } from 'src/entities/babyRobot/babyRobot.module';
import { ScoringModule } from 'src/entities/scoring/scoring.module';
import { BabyRobotsPreviewController } from './babyRobotsPreview.controller';
import { BabyRobotsPreviewGenerator } from './babyRobotsPreview.generator';
import { BabyRobotsPreviewHelper } from './babyRobotsPreview.helper';

import { BabyRobotsPreviewService } from './babyRobotsPreview.service';
import { CustomItemModule } from 'src/entities/robotCustomItem/customItem.module';

@Module({
	imports: [ScoringModule, CustomItemModule, forwardRef(() => BabyRobotModule)],
	providers: [BabyRobotsPreviewService, BabyRobotsPreviewHelper, BabyRobotsPreviewGenerator],
	controllers: [BabyRobotsPreviewController],
	exports: [BabyRobotsPreviewService, BabyRobotsPreviewGenerator]
})
export class BabyRobotsPreviewModule {}
