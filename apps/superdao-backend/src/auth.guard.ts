import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import express from 'express';
import { ContextWithDataSources } from 'src/types/contextWithDataSources';

@Injectable()
export class AuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext) {
		const request: express.Request = GqlExecutionContext.create(context).getContext<ContextWithDataSources>().req;

		return Boolean(request.session?.userId);
	}
}
