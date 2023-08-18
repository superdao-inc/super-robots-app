import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddForOwnersColumnMock1675781258776 implements MigrationInterface {
	name = 'AddForOwnersColumnMock1675781258776';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`UPDATE "offers" SET "forOwners" = 'This pitch deck will be used to secure additional funding and partnerships, as well as to communicate the unique value [Telegram private group](https://t.me/superlink)' WHERE "ownerId"='f2735330-7193-4285-bb74-def9e8185c95'` // NANSEN
		);
		await queryRunner.query(
			`UPDATE "offers" SET "forOwners" = 'This pitch deck will be used to secure additional funding and partnerships, as well as to communicate the unique value [Telegram private group](https://t.me/superlink)' WHERE "ownerId"='7450cf68-d920-423f-9ba6-5ef6b1d0c63e'` // POLYGON
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`UPDATE "offers" SET "forOwners" = NULL WHERE "ownerId"='f2735330-7193-4285-bb74-def9e8185c95'`
		);
		await queryRunner.query(
			`UPDATE "offers" SET "forOwners" = NULL WHERE "ownerId"='7450cf68-d920-423f-9ba6-5ef6b1d0c63e'`
		);
	}
}
