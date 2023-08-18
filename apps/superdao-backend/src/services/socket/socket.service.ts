import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import session from 'cookie-session';
import express from 'express';
import { CustomLogger } from '@dev/nestjs-common';
import { RedisIoAdapter } from 'src/services/socket/redis-io.adapter';
import { config } from 'src/config';
import { MessageBody, MessageName } from '@sd/superdao-shared';

@Injectable()
@WebSocketGateway({
	connectTimeout: 60000
})
export class SocketService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	constructor(private logger: CustomLogger) {
		this.logger = logger.createScope(SocketService.name);
	}

	@WebSocketServer()
	server: Server;

	afterInit(server: Server) {
		server.use((socket, next) =>
			session({
				keys: [config.keys.session],
				maxAge: config.session.maxAge
			})(socket.request as express.Request, {} as express.Response, next as express.NextFunction)
		);

		server.use((socket, next) => {
			let error: any = null;
			try {
				socket.handshake.auth = { ...socket.request.session };
			} catch (err) {
				error = err;
			}
			return next(error);
		});
	}

	handleConnection(socket: Socket) {
		if (!socket.handshake.auth.userId) {
			socket.disconnect();
			return;
		}
		this.logger.log(`Socket with id ${socket.id} was opened, userId: ${socket.handshake.auth.userId}`);
		const roomId = RedisIoAdapter.formatUserIdRoom(socket.handshake.auth.userId);
		socket.join(roomId);
	}

	sendPrivateMessage(userId: string, message: MessageName, body?: MessageBody[typeof message]) {
		this.server.to(RedisIoAdapter.formatUserIdRoom(userId)).emit(String(message), body);
	}

	handleDisconnect(socket: Socket) {
		this.logger.log(`Socket with id ${socket.id} was closed`);
		const roomId = RedisIoAdapter.formatUserIdRoom(socket.handshake.auth.userId);
		socket.leave(roomId);
	}
}
