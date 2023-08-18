import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCampaignReportCreatedAtFieldToOffer1677164501281 implements MigrationInterface {
	name = 'AddCampaignReportCreatedAtFieldToOffer1677164501281';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "offers" ADD "campaignReportCreatedAt" TIMESTAMP WITH TIME ZONE`);
		await queryRunner.query(`CREATE INDEX "IDX_444952577d9127031cbf204f83" ON "offers" ("campaignReportCreatedAt") `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "public"."IDX_444952577d9127031cbf204f83"`);
		await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "campaignReportCreatedAt"`);
	}
}
