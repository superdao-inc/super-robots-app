import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RewardMintModule } from 'src/services/rewardMint/rewardMint.module';

import { BabyRobotsPreviewModule } from 'src/services/babyRobotsPreview/babyRobotsPreview.module';
import { ScoringModule } from 'src/entities/scoring/scoring.module';
import { BabyRobotLayers } from 'src/entities/babyRobot/babyRobotLayers.model';
import { BabyRobotRepository } from './babyRobot.repo';
import { BabyRobotResolver } from './babyRobot.resolver';
import { BabyRobotService } from './babyRobot.service';
import { BabyRobot } from './babyRobot.model';
import { BabyRobotMint } from './babyRobotMint.model';
import { UserModule } from '../user/user.module';
import { BabyRobotErc721Controller } from './babyRobot.erc721.controller';
import { BabyRobotMintEligible } from './babyRobotMintEligible.model';
import { BabyRobotGraphModule } from 'src/services/babyRobotGraph/BabyRobotGraph.module';
import { BabyRobotUserChoice } from './babyRobotUserChoice.model';
import { UserCodesModule } from '../userCodes/userCodes.module';
import { ActiveInvitationsModule } from '../activeInvitations/activeInvitations.module';
import { BabyRobotCustomizeEligible } from './babyRobotCustomizeEligible.model';
import { RabbitMqModule } from 'src/services/rabbit/RabbitMq.module';
import { CustomItemModule } from '../robotCustomItem/customItem.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			BabyRobot,
			BabyRobotMint,
			BabyRobotLayers,
			BabyRobotMintEligible,
			BabyRobotUserChoice,
			BabyRobotCustomizeEligible
		]),
		UserModule,
		RewardMintModule,
		BabyRobotGraphModule,
		UserCodesModule,
		ActiveInvitationsModule,
		forwardRef(() => BabyRobotsPreviewModule),
		ScoringModule,
		RabbitMqModule,
		CustomItemModule
	],
	providers: [BabyRobotService, BabyRobotRepository, BabyRobotResolver],
	controllers: [BabyRobotErc721Controller],
	exports: [BabyRobotService, BabyRobotRepository]
})
export class BabyRobotModule {}
