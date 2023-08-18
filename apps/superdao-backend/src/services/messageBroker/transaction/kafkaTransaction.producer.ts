import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { log } from 'src/utils/logger';
import { KAFKA_CLIENT_SERVICE } from 'src/services/kafka/constants';
import { Topics } from 'src/services/kafka/topics';

@Injectable()
export class ProducerService {
	constructor(@Inject(KAFKA_CLIENT_SERVICE) private readonly client: ClientKafka) {}

	async onApplicationBootstrap() {
		await this.client.connect();
	}

	private async publish(topic: Topics, msg: Record<string, any>) {
		try {
			this.client.emit(topic, msg);
			log.log(`[ProducerService] Sent message to Kafka:`, { msg });
		} catch (e) {
			log.error(new Error('[ProducerService] Failed to send message to Kafka'), { error: e, msg });
		}
	}

	async publishTransaction(msg: any) {
		await this.publish(Topics.Transaction, msg);
	}
}
