import { Module } from '@nestjs/common';
import { makeCounterProvider, PrometheusModule } from '@willsoto/nestjs-prometheus';

import { TransactionMetricsService } from './transaction-metrics.service';
import {
	SUCCESSFUL_GASLESS_BAN_MEMBER_COUNT,
	SUCCESSFUL_USUAL_BAN_MEMBER_COUNT,
	FAILED_GASLESS_BAN_MEMBER_COUNT,
	FAILED_USUAL_BAN_MEMBER_COUNT,
	SUCCESSFUL_GASLESS_AIRDROP_COUNT,
	SUCCESSFUL_USUAL_AIRDROP_COUNT,
	FAILED_GASLESS_AIRDROP_COUNT,
	FAILED_USUAL_AIRDROP_COUNT
} from 'src/services/transacton-metrics/transaction-metrics.constants';

@Module({
	imports: [
		PrometheusModule.register({
			defaultMetrics: {
				enabled: false
			}
		})
	],
	providers: [
		TransactionMetricsService,
		makeCounterProvider({
			name: SUCCESSFUL_GASLESS_BAN_MEMBER_COUNT.name,
			help: SUCCESSFUL_GASLESS_BAN_MEMBER_COUNT.help
		}),
		makeCounterProvider({
			name: SUCCESSFUL_USUAL_BAN_MEMBER_COUNT.name,
			help: SUCCESSFUL_USUAL_BAN_MEMBER_COUNT.help
		}),
		makeCounterProvider({
			name: FAILED_GASLESS_BAN_MEMBER_COUNT.name,
			help: FAILED_GASLESS_BAN_MEMBER_COUNT.help
		}),
		makeCounterProvider({
			name: FAILED_USUAL_BAN_MEMBER_COUNT.name,
			help: FAILED_USUAL_BAN_MEMBER_COUNT.help
		}),
		makeCounterProvider({
			name: SUCCESSFUL_GASLESS_AIRDROP_COUNT.name,
			help: SUCCESSFUL_GASLESS_AIRDROP_COUNT.help
		}),
		makeCounterProvider({
			name: SUCCESSFUL_USUAL_AIRDROP_COUNT.name,
			help: SUCCESSFUL_USUAL_AIRDROP_COUNT.help
		}),
		makeCounterProvider({
			name: FAILED_GASLESS_AIRDROP_COUNT.name,
			help: FAILED_GASLESS_AIRDROP_COUNT.help
		}),
		makeCounterProvider({
			name: FAILED_USUAL_AIRDROP_COUNT.name,
			help: FAILED_USUAL_AIRDROP_COUNT.help
		})
	],
	exports: [TransactionMetricsService]
})
export class TransactionMetricsModule {}
