import { Controller } from '@nestjs/common';

import { CustomLogger } from '@dev/nestjs-common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { RobotImageGenerationBrokerWorkerService } from './robotImageGenerationBrokerWorker.service';

@Controller()
export class RobotImageGenerationBrokerWorkerController {
	constructor(
		private readonly robotImageGenerationBrokerWorkerService: RobotImageGenerationBrokerWorkerService,
		private logger: CustomLogger
	) {
		this.logger = logger.createScope(RobotImageGenerationBrokerWorkerService.name);
	}

	@MessagePattern('robot-image-generation-event')
	public async execute(@Payload() data: any, @Ctx() context: RmqContext) {
		const channel = context.getChannelRef();

		const originalMessage = context.getMessage();

		const parsedData = JSON.parse(data);

		this.logger.log('event registered', { data: parsedData });

		try {
			await this.robotImageGenerationBrokerWorkerService.generateImage(parsedData);

			channel.ack(originalMessage);
		} catch (e) {
			this.logger.error(new Error('Error during generating image by broker event'), { data: parsedData });

			channel.nack(originalMessage);
		}
	}
}
