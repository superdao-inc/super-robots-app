import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnTagsToEarlyAdopterTable1670428265131 implements MigrationInterface {
	name = 'AddColumnTagsToEarlyAdopterTable1670428265131';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters" ADD "tags" character varying array NOT NULL DEFAULT '{}'`
		);

		// mock data
		await queryRunner.query(`
			UPDATE public.scoring_audience_early_adopters
				SET tags='{new,influencer}'
				WHERE wallet='0x0000000000000000000000000000000000000001';
			UPDATE public.scoring_audience_early_adopters
				SET tags='{new}'
				WHERE wallet='0x0000000000000000000000000000000000000002';
			UPDATE public.scoring_audience_early_adopters
				SET tags='{collector,customer,influencer}'
				WHERE wallet='0x0000000000000000000000000000000000000006';
			UPDATE public.scoring_audience_early_adopters
				SET tags='{new}'
				WHERE wallet='0x0000000000000000000000000000000000000007';
			UPDATE public.scoring_audience_early_adopters
				SET tags='{collector,customer,new,influencer}'
				WHERE wallet='0x0000000000000000000000000000000000000009';
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters" DROP COLUMN "tags"`);
	}
}
