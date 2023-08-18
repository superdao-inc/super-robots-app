import { MigrationInterface, QueryRunner } from 'typeorm';

export class TierConfigs1665154403645 implements MigrationInterface {
	name = 'TierConfigs1665154403645';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "tier_config" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tierId" character varying NOT NULL, "daoAddress" character varying NOT NULL, "collectionAddress" character varying NOT NULL, "isHidden" boolean NOT NULL DEFAULT false, "position" integer, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "UQ_0c84727a8351fa094f2178b5850" UNIQUE ("collectionAddress", "tierId"), CONSTRAINT "PK_0bb83bdb569b39b9e7e913aa59d" PRIMARY KEY ("id"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "tier_config"`);
	}
}
