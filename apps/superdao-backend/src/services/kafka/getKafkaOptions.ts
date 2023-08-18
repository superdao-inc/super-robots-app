import { ConfigService } from '@nestjs/config';
import { ClientKafka, Transport } from '@nestjs/microservices';
import { KafkaConfig } from 'kafkajs';

const KAFKA_CLIENT_ID = 'superdao-reward-wallet';
const CONSUMER_GROUP_ID = 'superdao-reward-wallet-consumers';
const SASL_MECHANISM = 'scram-sha-256';

export const getKafkaOptions = (configService: ConfigService) => {
	const host = configService.get<string>('kafka.host')!;
	const port = configService.get<string>('kafka.port');
	const appEnv = configService.get<string>('appEnv');

	const username = configService.get<string>('kafka.username') || '';
	const password = configService.get<string>('kafka.password') || '';

	const kafkaConfig: KafkaConfig = {
		clientId: KAFKA_CLIENT_ID,
		brokers: [`${host}:${port}`]
	};

	if (appEnv !== 'dev') {
		kafkaConfig.ssl = {
			rejectUnauthorized: false
		};
		kafkaConfig.sasl = {
			mechanism: SASL_MECHANISM,
			username,
			password
		};
	}

	return {
		transport: Transport.KAFKA,
		options: {
			client: kafkaConfig,
			consumer: {
				groupId: CONSUMER_GROUP_ID
			}
		},
		customClass: ClientKafka
	};
};
