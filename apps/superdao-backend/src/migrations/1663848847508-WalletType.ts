import { MigrationInterface, QueryRunner } from 'typeorm';

export class WalletType1663848847508 implements MigrationInterface {
	name = 'WalletType1663848847508';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "public"."users_wallettype_enum" AS ENUM('SMART_WALLET', 'METAMASK', 'WALLET_CONNECT', 'MAGIC_LINK')`
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "walletType" "public"."users_wallettype_enum" NOT NULL DEFAULT 'METAMASK'`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "walletType"`);
		await queryRunner.query(`DROP TYPE "public"."users_wallettype_enum"`);
	}
}
