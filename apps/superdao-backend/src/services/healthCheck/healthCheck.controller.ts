import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthCheckController {
	constructor() {}

	@Get('health')
	async health() {
		return { status: 'ok' };
	}
}
