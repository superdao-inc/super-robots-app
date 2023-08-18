import { Controller, Get, Header, UseGuards } from '@nestjs/common';
import client from 'prom-client';
import { PromGuard } from 'src/prom.guard';

@Controller('metrics')
@UseGuards(PromGuard)
export class PrometheusController {
	@Get()
	@Header('Content-Type', client.register.contentType)
	async index(): Promise<string> {
		return await client.register.metrics();
	}
}
