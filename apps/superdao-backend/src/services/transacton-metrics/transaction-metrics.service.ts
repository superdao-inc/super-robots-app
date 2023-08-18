import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import {
	FAILED_GASLESS_AIRDROP_COUNT,
	FAILED_GASLESS_BAN_MEMBER_COUNT,
	FAILED_USUAL_AIRDROP_COUNT,
	FAILED_USUAL_BAN_MEMBER_COUNT,
	SUCCESSFUL_GASLESS_AIRDROP_COUNT,
	SUCCESSFUL_GASLESS_BAN_MEMBER_COUNT,
	SUCCESSFUL_USUAL_AIRDROP_COUNT,
	SUCCESSFUL_USUAL_BAN_MEMBER_COUNT
} from './transaction-metrics.constants';

@Injectable()
export class TransactionMetricsService {
	constructor(
		@InjectMetric(SUCCESSFUL_GASLESS_BAN_MEMBER_COUNT.name)
		private readonly successfulGaslessBanMemberCount: Counter<string>,
		@InjectMetric(SUCCESSFUL_USUAL_BAN_MEMBER_COUNT.name)
		private readonly successfulUsualBanMemberCount: Counter<string>,
		@InjectMetric(FAILED_GASLESS_BAN_MEMBER_COUNT.name)
		private readonly failedGaslessBanMemberCount: Counter<string>,
		@InjectMetric(FAILED_USUAL_BAN_MEMBER_COUNT.name)
		private readonly failedUsualBanMemberCount: Counter<string>,
		@InjectMetric(SUCCESSFUL_GASLESS_AIRDROP_COUNT.name)
		private readonly successfulGaslessAirdropCount: Counter<string>,
		@InjectMetric(SUCCESSFUL_USUAL_AIRDROP_COUNT.name)
		private readonly successfulUsualAirdropCount: Counter<string>,
		@InjectMetric(FAILED_GASLESS_AIRDROP_COUNT.name)
		private readonly failedGaslessAirdropCount: Counter<string>,
		@InjectMetric(FAILED_USUAL_AIRDROP_COUNT.name)
		private readonly failedUsualAirdropCount: Counter<string>
	) {}

	trackSuccessfulBanMember(isGasless: boolean) {
		if (isGasless) {
			this.successfulGaslessBanMemberCount.inc();
		} else {
			this.successfulUsualBanMemberCount.inc();
		}
	}

	trackFailedBanMember(isGasless: boolean) {
		if (isGasless) {
			this.failedGaslessBanMemberCount.inc();
		} else {
			this.failedUsualBanMemberCount.inc();
		}
	}

	trackSuccessfulAirdrop(isGasless: boolean) {
		if (isGasless) {
			this.successfulGaslessAirdropCount.inc();
		} else {
			this.successfulUsualAirdropCount.inc();
		}
	}

	trackFailedAirdrop(isGasless: boolean) {
		if (isGasless) {
			this.failedGaslessAirdropCount.inc();
		} else {
			this.failedUsualAirdropCount.inc();
		}
	}
}
