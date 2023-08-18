import { Module } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { KAFKA_CLIENT_SERVICE } from 'src/services/kafka/constants';
import { getKafkaOptions } from 'src/services/kafka/getKafkaOptions';
import { ProducerService } from 'src/services/messageBroker/transaction/kafkaTransaction.producer';

@Module({
	providers: [
		ProducerService,
		{
			provide: KAFKA_CLIENT_SERVICE,
			useFactory: (configService: ConfigService) => {
				const options = getKafkaOptions(configService);
				return ClientProxyFactory.create(options);
			},
			inject: [ConfigService]
		}
	],
	exports: []
})
export class TransactionBrokerModule {}
