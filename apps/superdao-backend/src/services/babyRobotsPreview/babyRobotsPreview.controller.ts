import { Controller, Get } from '@nestjs/common';

import { BabyRobotsPreviewService } from './babyRobotsPreview.service';

@Controller()
export class BabyRobotsPreviewController {
	constructor(private readonly babyRobotsPreviewService: BabyRobotsPreviewService) {}

	// @Post('/api/babyRobots/preview')
	// async babyRobotsPreview(@Body() body: BabyRobotsPreviewDto) {
	// 	return this.babyRobotsPreviewService.getBabyRobotPreviewV2(body);
	// }

	@Get('/api/babyRobots/preview/random/batch')
	async babyRobotsRandomPreviewBatch() {
		return this.babyRobotsPreviewService.getBabyRobotRandomPreviewBatch();
	}
}
