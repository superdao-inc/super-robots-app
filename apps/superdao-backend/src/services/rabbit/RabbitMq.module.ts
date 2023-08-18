import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMqService } from './RabbitMq.service';
@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: 'rabbit-mq',
				imports: [ConfigModule],
				inject: [ConfigService],
				useFactory: async (configService: ConfigService) => ({
					transport: Transport.RMQ,
					options: {
						urls: [
							`amqp://${configService.get('rabbitMq.username')}:${configService.get(
								'rabbitMq.password'
							)}@${configService.get('rabbitMq.hostname')}:${configService.get('rabbitMq.port')}/${configService.get(
								'rabbitMq.vhost'
							)}`
						],
						queue: 'robot-image-generation',
						queueOptions: {
							durable: true,
							'x-consumer-timeout': 60000,
							'consumer-timeout': 60000,
							consumer_timeout: 60000,
							consumerTimeout: 60000
						},
						headers: { ['x-consumer-timeout']: '60000' },
						noAck: false,
						prefetchCount: 1
					}
				})
			}
		])
	],
	providers: [RabbitMqService],
	exports: [RabbitMqService]
})
export class RabbitMqModule {}
