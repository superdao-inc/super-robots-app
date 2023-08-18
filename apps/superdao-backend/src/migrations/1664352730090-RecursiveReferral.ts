import { MigrationInterface, QueryRunner } from 'typeorm';

export class RecursiveReferral1664352730090 implements MigrationInterface {
	name = 'RecursiveReferral1664352730090';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "referral_campaign" ADD "defaultLimit" integer NOT NULL DEFAULT '100'`);
		await queryRunner.query(`ALTER TABLE "referral_link" ALTER COLUMN "ambassadorWallet" DROP NOT NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "referral_campaign" DROP COLUMN "defaultLimit"`);
		await queryRunner.query(`ALTER TABLE "referral_link" ALTER COLUMN "ambassadorWallet" SET NOT NULL`);
	}
}
