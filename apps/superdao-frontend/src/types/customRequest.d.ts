import { IncomingMessage as httpIncomingMessage } from 'http';

declare module 'http' {
	interface IncomingMessage extends httpIncomingMessage {
		session: CookieSessionInterfaces.CookieSessionRequest['session'];
	}
}
