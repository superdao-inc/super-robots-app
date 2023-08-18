import { Request } from 'express';

interface DataSources {
	covalentAPI: any;
}

export interface ContextWithDataSources {
	req: Request;
	covalentApiKey: string;
	dataSources: DataSources;
}
