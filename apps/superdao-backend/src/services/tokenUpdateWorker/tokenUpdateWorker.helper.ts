import fetch from 'node-fetch';
import { Injectable } from '@nestjs/common';

import { CustomLogger } from '@dev/nestjs-common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { TokenUpdateEntry } from './tokenUpdateWorker.types';
import { config } from 'src/config';
import { SORTED_SET_KEY } from './tokenUpdateWorker.constants';
import { getUpdateRobotLayersKey } from '../cache';

interface ScrapeResult {
	[url: string]: string;
}

interface ScrapeListResponse {
	data: ScrapeResult;
	errors?: ScrapeResult;
}

const maxExecutionTimeMs = 300 * 1000;

const scraperUrl = config.tokenUpdate.SCRAPER_URL;

// is used for opensea valid request detection, is holded in _app-[hash].js file
// except x-signed-query exists x-build-id: (ea41272b8196e0c93d5e7ea3f3160cc8dc50e11c) is holded in code of element
const OPENSEA_SIGNED_QUERY = 'aca8db96dceca728d85769b3c7fc210d9d7f8eae6448bd2a81bbf8f7f6a48370';

@Injectable()
export class TokenUpdateWorkerHelper {
	constructor(private logger: CustomLogger, @InjectRedis() private readonly redis: Redis) {
		this.logger = logger.createScope(TokenUpdateWorkerHelper.name);
	}

	robotParts: Record<string, Buffer> = {};

	async processBatchTokenUpdate(entries: TokenUpdateEntry[], batchSize: number) {
		try {
			const params = new URLSearchParams(
				entries.map(
					(entry) =>
						[
							'url',
							`https://opensea.io/assets/matic/${config.robots.erc721BabyRobotContractAddress.toLowerCase()}/${
								entry.tokenId
							}`
						] as [string, string]
				)
			);
			params.append('xpath', '//script[@id="__NEXT_DATA__"]');

			const requestUrl = `${scraperUrl}/scrape/list?${params.toString()}`;
			const request = await fetch(requestUrl, { timeout: maxExecutionTimeMs });
			const response = (await request.json()) as ScrapeListResponse;

			const data = response.data;

			if (!data) {
				this.logger.error(new Error('Error while GET opensea token pages'), { entries, batchSize, response });

				return false;
			}

			try {
				await Promise.all(
					Object.values(data).map(async (value) => {
						const match = /"relayId":"(.+?)"/s.exec(value);
						const relayId = match?.[1];

						if (!relayId) return;

						const updateRequestUrl = `${scraperUrl}/make-post?url=https://opensea.io/__api/graphql/`;
						const updateRequest = await fetch(updateRequestUrl, {
							method: 'POST',
							body: JSON.stringify({
								payload: {
									id: 'ToolbarAssetRefreshMutation',
									query:
										'mutation ToolbarAssetRefreshMutation(\n  $asset: AssetRelayID!\n) {\n  assets {\n    refresh(asset: $asset)\n  }\n}\n',
									variables: {
										asset: relayId
									}
								},
								headers: {
									'x-signed-query': OPENSEA_SIGNED_QUERY
								}
							}),
							headers: {
								'content-type': 'application/json'
							},
							timeout: maxExecutionTimeMs
						});

						const updateResponse = await updateRequest.json();

						return updateResponse;
					})
				);
			} catch (e) {
				this.logger.error(new Error('Error while POST /graphql updateTokenMetadata to opensea'), { e });

				return false;
			}

			await this.handleUpdateSuccess(entries, batchSize);

			this.logger.log('robot token update for batch entries finished successfully');
		} catch (e) {
			this.logger.error(new Error(`Error while updating robot tokens: ${(e as any).message}`), {
				e
			});

			return false;
		}

		return true;
	}

	async handleUpdateSuccess(entries: TokenUpdateEntry[], batchSize: number) {
		await this.redis.zpopmin(SORTED_SET_KEY, batchSize);

		await Promise.all(
			entries.map(async (entry) => {
				await this.redis.del(getUpdateRobotLayersKey(entry.userId, entry.tokenId));
			})
		);
	}
}
