import express from 'express';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ForbiddenException, UseGuards } from '@nestjs/common';
import { UserCodes } from './userCodes.model';
import { UserCodesService } from './userCodes.service';
import { AuthGuard } from 'src/auth.guard';
import {
	AddActivationsToUserCodeResponse,
	CodeInvitationsInfoDto,
	CodeInvitationsInfoWithOwnerDataDto,
	GetCodeInvitationsInfoByCodeInput
} from './userCodes.dto';

@Resolver(() => UserCodes)
export class UserCodesResolver {
	constructor(private readonly userCodesService: UserCodesService) {}

	@UseGuards(AuthGuard)
	@Query(() => CodeInvitationsInfoDto, { nullable: true })
	getCodeInvitationsInfo(@Context('req') ctx: express.Request): any {
		const userId = ctx.session?.userId;
		if (!userId) {
			return null;
		}

		return this.userCodesService.getCodeInvitationsInfo(userId);
	}

	@Query(() => CodeInvitationsInfoWithOwnerDataDto, { nullable: true })
	getCodeInvitationsInfoByCode(
		@Args('getCodeInvitationsInfoByCodeInput') params: GetCodeInvitationsInfoByCodeInput
	): any {
		return this.userCodesService.getCodeInvitationsInfoByCode(params.code);
	}

	@UseGuards(AuthGuard)
	@Mutation(() => AddActivationsToUserCodeResponse)
	addActivationsToUserCode(@Context('req') ctx: express.Request) {
		const userId = ctx.session?.userId;
		if (!userId) {
			throw new ForbiddenException('Access forbidden');
		}

		return this.userCodesService.addActivationsToUserCode(userId);
	}

	@UseGuards(AuthGuard)
	@Query(() => Boolean)
	getCanUserRefillCode(@Context('req') ctx: express.Request) {
		const userId = ctx.session?.userId;
		if (!userId) {
			throw new ForbiddenException('Access forbidden');
		}

		return this.userCodesService.getCanUserRefillCode(userId);
	}

	@UseGuards(AuthGuard)
	@Query(() => Boolean)
	isUserInfluencer(@Context('req') ctx: express.Request) {
		const userId = ctx.session?.userId;
		if (!userId) {
			throw new ForbiddenException('Access forbidden');
		}

		return this.userCodesService.isUserInfluencer(userId);
	}
}
