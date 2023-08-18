import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeDaoMembershipTierToTiers1664350420904 implements MigrationInterface {
	name = 'ChangeDaoMembershipTierToTiers1664350420904';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "dao_membership" RENAME COLUMN "tier" TO "tiers"`);
		await queryRunner.query(`ALTER TABLE "dao_membership" DROP COLUMN "tiers"`);
		await queryRunner.query(`ALTER TABLE "dao_membership" ADD "tiers" character varying array NOT NULL DEFAULT '{}'`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "dao_membership" DROP COLUMN "tiers"`);
		await queryRunner.query(`ALTER TABLE "dao_membership" ADD "tiers" character varying`);
		await queryRunner.query(`ALTER TABLE "dao_membership" RENAME COLUMN "tiers" TO "tier"`);
	}
}
