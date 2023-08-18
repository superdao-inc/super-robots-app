import { Injectable } from '@nestjs/common';
import { CustomLogger } from '@dev/nestjs-common';
import { HttpService } from '@nestjs/axios';

import { config } from 'src/config';
import { GetWalletAttributesResponse } from 'src/entities/scoring/scoring-api.generated';
import { CacheService, getWalletScoringDataKey } from 'src/services/cache';
import { ScoringAudienceItem } from 'src/entities/babyRobot/babyRobot.dto';

const WALLET_SCORING_DATA_TTL = 10 * 60; // 10 min

@Injectable()
export class ScoringApiDataProviderService {
	baseUrl: string;

	constructor(
		private readonly httpService: HttpService,
		private readonly cacheService: CacheService,
		private logger: CustomLogger
	) {
		this.baseUrl = config.api.SCORING_API_BASE_URL;
	}

	async getWalletScoringData(walletAddress: string): Promise<ScoringAudienceItem> {
		const wallet = walletAddress.toLowerCase();

		const cacheKey = getWalletScoringDataKey(wallet);

		const cachedData = await this.cacheService.get(cacheKey);

		if (cachedData !== null) {
			return this.mapWalletScoringData(JSON.parse(cachedData));
		}

		let walletAttributes;
		try {
			walletAttributes = await this.getWalletScoringDataFromApi(wallet);

			await this.cacheService.set(cacheKey, JSON.stringify(walletAttributes ?? { wallet }), WALLET_SCORING_DATA_TTL);
		} catch (e) {
			this.logger.error(new Error('Error during getting wallet scoring data from scoring api'), { wallet, e });
		}

		return this.mapWalletScoringData((walletAttributes ?? { wallet }) as GetWalletAttributesResponse);
	}

	private async getWalletScoringDataFromApi(wallet: string): Promise<GetWalletAttributesResponse> {
		const response = await this.httpService.axiosRef.get<GetWalletAttributesResponse>(
			`${this.baseUrl}/wallet/attributes/${wallet}`
		);
		return response.data;
	}

	private mapWalletScoringData(data: GetWalletAttributesResponse): ScoringAudienceItem {
		return {
			wallet: data.wallet,
			score: data.superrank || 0,
			tags: data.labels?.map((tag) => tag.replace(/'/g, '')) || [],
			nftsCount: data.nfts_count || 0,
			ens: data.ens_name || '',
			twitterUrl: data.twitter_url || '',
			twitterAvatarUrl: data.twitter_avatar_url || '',
			twitterUsername: data.twitter_username || '',
			walletUsdCap: data.wallet_usd_cap || 0,
			twitterFollowersCount: data.twitter_followers_count || 0,
			activity: data.whitelist_activity?.map((activityContract) => activityContract.replace(/'/g, '')) || [],
			lastMonthTxCount: data.last_month_tx_count || 0
		};
	}
}
