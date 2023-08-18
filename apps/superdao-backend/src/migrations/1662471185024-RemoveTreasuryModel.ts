import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveTreasuryModel1662471185024 implements MigrationInterface {
	name = 'RemoveTreasuryModel1662471185024';

	public async up(queryRunner: QueryRunner): Promise<void> {
		// add wallets.daoId FK
		await queryRunner.query(`
			ALTER TABLE "wallets"
			ADD "daoId" uuid
		`);
		await queryRunner.query(
			`ALTER TABLE "wallets"
			ADD CONSTRAINT "FK_6c27ff3ac57fc128c03919c195f"
			FOREIGN KEY ("daoId")
			REFERENCES "daos"("id")
			ON DELETE NO ACTION
			ON UPDATE NO ACTION`
		);

		// update wallets.daoId
		await queryRunner.query(`
			UPDATE wallets AS w
			SET "daoId" = t."daoId"
			FROM treasuries AS t
			WHERE w."treasuryId" = t.id
		`);

		// make wallets.daoId FK NOT NULL
		await queryRunner.query(`
			ALTER TABLE "wallets"
			ALTER COLUMN "daoId"
			SET NOT NULL
		`);

		// drop wallets.treasury
		await queryRunner.query(`
			ALTER TABLE "wallets"
			DROP CONSTRAINT "FK_28f0e0b8492d5a1bf1c1ce8c316"
		`);
		await queryRunner.query(`
			ALTER TABLE "treasuries"
			DROP CONSTRAINT "FK_2f0b27e78dd1ce5caae66b77465"
		`);
		await queryRunner.query(`
			ALTER TABLE "wallets"
			DROP COLUMN "treasuryId"
		`);

		// drop treasuries table
		await queryRunner.query(`DROP TABLE "treasuries"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// create treasuries table
		await queryRunner.query(`
			CREATE TABLE "treasuries" (
			id uuid DEFAULT uuid_generate_v4() NOT NULL,
			"daoId" uuid NOT NULL,
			"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
			"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
		)`);
		await queryRunner.query(`
			ALTER TABLE "treasuries"
			ADD CONSTRAINT "FK_2f0b27e78dd1ce5caae66b77465"
			FOREIGN KEY ("daoId")
			REFERENCES "daos"("id")
			ON DELETE NO ACTION
			ON UPDATE NO ACTION
		`);
		await queryRunner.query(`
			ALTER TABLE "treasuries"
			ADD CONSTRAINT "PK_6d41702e8cbb474881e821b378c"
			PRIMARY KEY (id)
		`);

		// add wallets.treasury (non-fk yet)
		await queryRunner.query(`
			ALTER TABLE "wallets"
			ADD COLUMN "treasuryId" uuid
		`);

		// update wallets.treasury
		// step 1: for each distinct daoId in wallets set generated treasuryId
		await queryRunner.query(`
			UPDATE wallets AS w
			SET "treasuryId" = t."gen_uuid"
			FROM (
				SELECT inner_w."daoId", uuid_generate_v4() AS gen_uuid
				FROM (
					SELECT DISTINCT "daoId"
					FROM wallets
				) AS inner_w
			) AS t
			WHERE w."daoId" = t."daoId"
		`);
		// step 2: create treasuries from generated wallets.treasuryId and wallets.daoId
		await queryRunner.query(`
			INSERT INTO treasuries ("id", "daoId")
			SELECT DISTINCT "treasuryId", "daoId"
			FROM wallets
		`);

		// make wallets.treasury FK
		await queryRunner.query(
			`ALTER TABLE "wallets"
			ADD CONSTRAINT "FK_28f0e0b8492d5a1bf1c1ce8c316"
			FOREIGN KEY ("treasuryId")
			REFERENCES "treasuries"("id")
			ON DELETE NO ACTION
			ON UPDATE NO ACTION`
		);
		// make wallets.treasuryid FK NOT NULL
		await queryRunner.query(`
			ALTER TABLE "wallets"
			ALTER COLUMN "treasuryId"
			SET NOT NULL
		`);

		// drop wallets.daoId
		await queryRunner.query(`
			ALTER TABLE "wallets"
			DROP COLUMN "daoId"
		`);
	}
}
