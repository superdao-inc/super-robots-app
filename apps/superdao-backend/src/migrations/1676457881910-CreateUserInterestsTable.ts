import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserInterestsTable1676457881910 implements MigrationInterface {
	name = 'CreateUserInterestsTable1676457881910';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "user_interests" ("wallet" character varying NOT NULL, "cryptoNative" boolean NOT NULL DEFAULT false, "developer" boolean NOT NULL DEFAULT false, "culture" boolean NOT NULL DEFAULT false, "gaming" boolean NOT NULL DEFAULT false, "defi" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "REL_d332e046acb1b89ad289d8e509" UNIQUE ("wallet"), CONSTRAINT "PK_d332e046acb1b89ad289d8e509c" PRIMARY KEY ("wallet"))`
		);
		await queryRunner.query(
			`ALTER TABLE "user_interests" ADD CONSTRAINT "FK_d332e046acb1b89ad289d8e509c" FOREIGN KEY ("wallet") REFERENCES "users"("walletAddress") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user_interests" DROP CONSTRAINT "FK_d332e046acb1b89ad289d8e509c"`);
		await queryRunner.query(`DROP TABLE "user_interests"`);
	}
}
