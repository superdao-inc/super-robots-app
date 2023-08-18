import { Module } from '@nestjs/common';
import { BabyRobotGraphService } from './BabyRobotGraph.service';

@Module({
	providers: [BabyRobotGraphService],
	exports: [BabyRobotGraphService]
})
export class BabyRobotGraphModule {}
