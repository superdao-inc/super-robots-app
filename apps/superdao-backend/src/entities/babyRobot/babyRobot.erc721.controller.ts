import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

import { ERC721TokenMetadata } from 'src/types/metadata';
import { BabyRobotService } from './babyRobot.service';

@Controller('api/erc721/robots')
export class BabyRobotErc721Controller {
	constructor(private readonly babyRobotService: BabyRobotService) {}

	@Get('/:tokenId')
	async getRobotByTokenId(@Req() request: Request): Promise<ERC721TokenMetadata> {
		const {
			params: { tokenId }
		} = request;

		return this.babyRobotService.getRobotMetadataByTokenId(tokenId);
	}
}
