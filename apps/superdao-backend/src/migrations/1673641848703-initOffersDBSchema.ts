import { MigrationInterface, QueryRunner } from 'typeorm';

export class initOffersDBSchema1673641848703 implements MigrationInterface {
	name = 'initOffersDBSchema1673641848703';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "owners" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "title" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "UQ_fd88b5d31c91608bb930f48e095" UNIQUE ("title"), CONSTRAINT "UQ_8b4517a75b590441b053531911b" UNIQUE ("image"), CONSTRAINT "PK_42838282f2e6b216301a70b02d6" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "offer_claims_data" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "payload" json NOT NULL DEFAULT '{}', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "offerId" uuid, "userId" uuid, CONSTRAINT "PK_f6faeb32a68b19fb808fbb48318" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(`CREATE TYPE "public"."offers_type_enum" AS ENUM('quest', 'test', 'mint')`);
		await queryRunner.query(
			`CREATE TABLE "offers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "content" character varying NOT NULL, "kernelAddress" character varying NOT NULL, "collectionAddress" character varying NOT NULL, "tierId" character varying NOT NULL, "type" "public"."offers_type_enum" NOT NULL DEFAULT 'mint', "mainReward" character varying NOT NULL, "rewards" json NOT NULL DEFAULT '[]', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "expiredAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "ownerId" uuid, CONSTRAINT "UQ_272372013b6125aec8790c8ca07" UNIQUE ("slug"), CONSTRAINT "PK_4c88e956195bba85977da21b8f4" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(`CREATE INDEX "IDX_272372013b6125aec8790c8ca0" ON "offers" ("slug") `);
		await queryRunner.query(`CREATE INDEX "IDX_8101f7169d0e4bf3695de1c4eb" ON "offers" ("type") `);
		await queryRunner.query(
			`CREATE TABLE "offer_claims" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "offerId" uuid, "userId" uuid, CONSTRAINT "PK_7d54ce6a70db093f45c11421d6d" PRIMARY KEY ("id"))`
		);

		await queryRunner.query(
			`ALTER TABLE "offer_claims_data" ADD CONSTRAINT "FK_94619191cec719766c8cb3f64f5" FOREIGN KEY ("offerId") REFERENCES "offers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "offer_claims_data" ADD CONSTRAINT "FK_b250cbc9764a1ff31147f1aa49b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "offers" ADD CONSTRAINT "FK_b3d2e02b02f46a78defedc3650c" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "offer_claims" ADD CONSTRAINT "FK_9cd9298be275909a30cc8a93bab" FOREIGN KEY ("offerId") REFERENCES "offers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "offer_claims" ADD CONSTRAINT "FK_4a27025b11c8156146991dada17" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);

		// mock to imitate claim
		// await queryRunner.query(
		// 	`insert into offer_claims("offerId", "userId") values ('*OFFER_ID*', '*USER_ID*')`
		// );
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "offer_claims" DROP CONSTRAINT "FK_4a27025b11c8156146991dada17"`);
		await queryRunner.query(`ALTER TABLE "offer_claims" DROP CONSTRAINT "FK_9cd9298be275909a30cc8a93bab"`);
		await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_b3d2e02b02f46a78defedc3650c"`);
		await queryRunner.query(`ALTER TABLE "offer_claims_data" DROP CONSTRAINT "FK_b250cbc9764a1ff31147f1aa49b"`);
		await queryRunner.query(`ALTER TABLE "offer_claims_data" DROP CONSTRAINT "FK_94619191cec719766c8cb3f64f5"`);

		await queryRunner.query(`DROP TABLE "offer_claims"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_8101f7169d0e4bf3695de1c4eb"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_272372013b6125aec8790c8ca0"`);
		await queryRunner.query(`DROP TABLE "offers"`);
		await queryRunner.query(`DROP TYPE "public"."offers_type_enum"`);
		await queryRunner.query(`DROP TABLE "offer_claims_data"`);
		await queryRunner.query(`DROP TABLE "owners"`);
	}
}
