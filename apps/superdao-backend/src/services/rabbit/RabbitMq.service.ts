import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMqService {
	constructor(@Inject('rabbit-mq') private readonly client: ClientProxy) {}

	onApplicationBootstrap() {
		this.client.connect();
	}

	public send(pattern: string, data: any) {
		return this.client.send(pattern, JSON.stringify(data)).toPromise();
	}
}
