import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import defaults from 'lodash/defaults';

import { VerificationError, VerificationErrorCode } from './verification.error';

type TokenPayload = Record<string, unknown>;
type TokenOptions = { expiresIn: string | number | undefined };

const TOKEN_DEFAULT_OPTIONS = { expiresIn: '20m' };

@Injectable()
export class VerificationService {
	constructor(private readonly jwtService: JwtService) {}

	generateToken<T extends TokenPayload = TokenPayload>(payload: T, options?: TokenOptions): string {
		const { expiresIn } = defaults(options, TOKEN_DEFAULT_OPTIONS);

		return this.jwtService.sign(payload, { expiresIn });
	}

	private matchVerificationError(error: unknown): never {
		if (error instanceof Error) {
			// https://www.npmjs.com/package/jsonwebtoken#errors--codes
			switch (error.name) {
				case 'TokenExpiredError':
					throw new VerificationError(VerificationErrorCode.TOKEN_EXPIRED);
				case 'JsonWebTokenError':
					throw new VerificationError(VerificationErrorCode.TOKEN_INVALID);
			}
		}

		throw new VerificationError(VerificationErrorCode.UNKNOWN);
	}

	verifyToken<T extends TokenPayload = TokenPayload>(token: string): T {
		try {
			const { ...tokenData } = this.jwtService.verify(token);
			return tokenData;
		} catch (error) {
			this.matchVerificationError(error);
		}
	}

	async verifyTokenAsync<T extends TokenPayload = TokenPayload>(token: string): Promise<T> {
		try {
			const { ...tokenData } = await this.jwtService.verifyAsync(token);
			return tokenData;
		} catch (error) {
			this.matchVerificationError(error);
		}
	}
}
