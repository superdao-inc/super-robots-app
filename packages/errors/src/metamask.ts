const disallowedCodeActions = ['ACTION_REJECTED'];

export const removeStackFromMetamask = (ctx: Record<string, any>) => {
	if (ctx === null || disallowedCodeActions.includes(ctx.code)) return null;

	if (ctx?.transaction && ctx?.error) {
		delete ctx.error.stack;
	}

	return JSON.stringify(ctx);
};
