import { Global, Module } from '@nestjs/common';
import { SocketService } from 'src/services/socket/socket.service';

@Global()
@Module({
	providers: [SocketService],
	exports: [SocketService]
})
export class EventsModule {}
