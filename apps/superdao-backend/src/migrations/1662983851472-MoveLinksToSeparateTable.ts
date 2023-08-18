import { MigrationInterface, QueryRunner } from 'typeorm';

export class MoveLinksToSeparateTable1662983851472 implements MigrationInterface {
	name = 'MoveLinksToSeparateTable1662983851472';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "links" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "entityId" uuid NOT NULL, "site" character varying, "twitter" character varying, "instagram" character varying, "telegram" character varying, "discord" character varying, CONSTRAINT "PK_ecf17f4a741d3c5ba0b4c5ab4b6" PRIMARY KEY ("id"))`
		);

		await queryRunner.query(`ALTER TABLE "users" ADD "linksId" uuid`);
		await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_c6642b2e5d11b9b7404d9ac1093" UNIQUE ("linksId")`);
		await queryRunner.query(`ALTER TABLE "daos" ADD "linksId" uuid`);
		await queryRunner.query(`ALTER TABLE "daos" ADD CONSTRAINT "UQ_bf1e02e388da26f6dcd04d5c6f4" UNIQUE ("linksId")`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "FK_c6642b2e5d11b9b7404d9ac1093" FOREIGN KEY ("linksId") REFERENCES "links"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "daos" ADD CONSTRAINT "FK_bf1e02e388da26f6dcd04d5c6f4" FOREIGN KEY ("linksId") REFERENCES "links"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);

		await queryRunner.query(
			`insert into links("entityId", site, twitter, instagram, telegram, discord) select id, site, twitter, instagram, telegram, discord from daos`
		);

		await queryRunner.query(
			`update daos set "linksId"=sq.id from (select id, "entityId" from links) as sq where daos.id=sq."entityId"`
		);

		await queryRunner.query(
			`insert into links("entityId", site, twitter, instagram, telegram, discord) select id, site, twitter, instagram, telegram, discord from users`
		);

		await queryRunner.query(
			`update users set "linksId"=sq.id from (select id, "entityId" from links) as sq where users.id=sq."entityId"`
		);

		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "twitter"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "site"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "instagram"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "telegram"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "discord"`);
		await queryRunner.query(`ALTER TABLE "daos" DROP COLUMN "twitter"`);
		await queryRunner.query(`ALTER TABLE "daos" DROP COLUMN "site"`);
		await queryRunner.query(`ALTER TABLE "daos" DROP COLUMN "instagram"`);
		await queryRunner.query(`ALTER TABLE "daos" DROP COLUMN "telegram"`);
		await queryRunner.query(`ALTER TABLE "daos" DROP COLUMN "discord"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "daos" ADD "discord" character varying`);
		await queryRunner.query(`ALTER TABLE "daos" ADD "telegram" character varying`);
		await queryRunner.query(`ALTER TABLE "daos" ADD "instagram" character varying`);
		await queryRunner.query(`ALTER TABLE "daos" ADD "site" character varying`);
		await queryRunner.query(`ALTER TABLE "daos" ADD "twitter" character varying`);
		await queryRunner.query(`ALTER TABLE "users" ADD "discord" character varying`);
		await queryRunner.query(`ALTER TABLE "users" ADD "telegram" character varying`);
		await queryRunner.query(`ALTER TABLE "users" ADD "instagram" character varying`);
		await queryRunner.query(`ALTER TABLE "users" ADD "site" character varying`);
		await queryRunner.query(`ALTER TABLE "users" ADD "twitter" character varying`);

		await queryRunner.query(
			`update daos set site=sq.site, twitter=sq.twitter, instagram=sq.instagram, discord=sq.discord, telegram=sq.telegram from (select "entityId", site, twitter, instagram, discord, telegram from links) as sq where daos.id=sq."entityId"`
		);

		await queryRunner.query(
			`update users set site=sq.site, twitter=sq.twitter, instagram=sq.instagram, discord=sq.discord, telegram=sq.telegram from (select "entityId", site, twitter, instagram, discord, telegram from links) as sq where users.id=sq."entityId"`
		);

		await queryRunner.query(`ALTER TABLE "daos" DROP CONSTRAINT "FK_bf1e02e388da26f6dcd04d5c6f4"`);
		await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c6642b2e5d11b9b7404d9ac1093"`);
		await queryRunner.query(`ALTER TABLE "daos" DROP CONSTRAINT "UQ_bf1e02e388da26f6dcd04d5c6f4"`);
		await queryRunner.query(`ALTER TABLE "daos" DROP COLUMN "linksId"`);
		await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_c6642b2e5d11b9b7404d9ac1093"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "linksId"`);

		await queryRunner.query(`DROP TABLE "links"`);
	}
}
