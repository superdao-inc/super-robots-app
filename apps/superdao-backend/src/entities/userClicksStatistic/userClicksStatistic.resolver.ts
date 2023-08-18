import express from 'express';
import { Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ForbiddenException, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { UserClicksStatistic } from './userClicksStatistic.model';
import { UserClicksStatisticsService } from './userClicksStatistic.service';

@Resolver(() => UserClicksStatistic)
export class UserClicksStatisticResolver {
	constructor(private readonly userClicksStatisticsService: UserClicksStatisticsService) {}

	// customize

	@UseGuards(AuthGuard)
	@Query(() => Boolean)
	getIsStatisticClickCustomizeRegistered(@Context('req') ctx: express.Request): any {
		const userId = ctx.session?.userId;
		if (!userId) {
			throw new ForbiddenException('Access forbidden');
		}

		return this.userClicksStatisticsService.getIsStatisticClickCustomizeRegistered(userId);
	}

	@UseGuards(AuthGuard)
	@Mutation(() => Boolean)
	saveStatisticClickCustomize(@Context('req') ctx: express.Request): any {
		const userId = ctx.session?.userId;
		if (!userId) {
			throw new ForbiddenException('Access forbidden');
		}

		return this.userClicksStatisticsService.saveStatisticClickCustomize(userId);
	}

	// notify me

	@UseGuards(AuthGuard)
	@Query(() => Boolean)
	getIsStatisticClickNotifyMeRegistered(@Context('req') ctx: express.Request): any {
		const userId = ctx.session?.userId;
		if (!userId) {
			throw new ForbiddenException('Access forbidden');
		}

		return this.userClicksStatisticsService.getIsStatisticClickNotifyMeRegistered(userId);
	}

	@UseGuards(AuthGuard)
	@Mutation(() => Boolean)
	saveStatisticClickNotifyMe(@Context('req') ctx: express.Request): any {
		const userId = ctx.session?.userId;
		if (!userId) {
			throw new ForbiddenException('Access forbidden');
		}

		return this.userClicksStatisticsService.saveStatisticClickNotifyMe(userId);
	}
}
