import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import Redis from 'ioredis';
import { INestApplicationContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export class RedisIoAdapter extends IoAdapter {
	private adapterConstructor: ReturnType<typeof createAdapter>;

	constructor(private app: INestApplicationContext) {
		super(app);
	}

	async connectToRedis(): Promise<void> {
		const configService = this.app.get(ConfigService);

		const host = configService.get<string>('redis.host')!;
		const port = configService.get<number>('redis.port')!;
		const username = configService.get<string>('redis.user');
		const password = configService.get<string>('redis.password');

		const pubClient = new Redis(port, host, {
			username,
			password
		});
		const subClient = pubClient.duplicate();

		this.adapterConstructor = createAdapter(pubClient, subClient);
	}

	createIOServer(port: number, options?: ServerOptions): Server {
		const server = super.createIOServer(port, options);
		server.adapter(this.adapterConstructor);
		return server;
	}

	public static formatUserIdRoom(userId: string) {
		return `user-${userId}`;
	}
}
