import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsRecursiveReferralFlag1665415654197 implements MigrationInterface {
	name = 'AddIsRecursiveReferralFlag1665415654197';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "referral_campaign" ADD "isRecursive" boolean NOT NULL DEFAULT false`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "referral_campaign" DROP COLUMN "isRecursive"`);
	}
}
