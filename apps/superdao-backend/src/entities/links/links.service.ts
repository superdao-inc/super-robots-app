import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Links } from './links.model';

@Injectable()
export class LinksService {
	constructor(@InjectRepository(Links) private linksRepository: Repository<Links>) {}

	async getById(id: string) {
		return this.linksRepository.findOne({ where: { id } });
	}
}
