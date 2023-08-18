import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewColumnsAtDaoTableAndConstrains1660893293682 implements MigrationInterface {
	name = 'NewColumnsAtDaoTableAndConstrains1660893293682';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "attachments" DROP CONSTRAINT "FK_f54127860e8075e61dd7d95c80b"`);
		await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_b29fe2a625774b639422f98681f"`);
		await queryRunner.query(`ALTER TABLE "proposals" DROP CONSTRAINT "FK_08e15fa3cc356577c8e54bbc236"`);
		await queryRunner.query(`ALTER TABLE "dao_membership" DROP CONSTRAINT "FK_c7efde93fe3cc05bbbd0ffdb178"`);
		await queryRunner.query(`ALTER TABLE "whitelists" DROP CONSTRAINT "UQ_988f3c26b3aaed34ddfa61e5fdf"`);
		await queryRunner.query(`ALTER TABLE "daos" ADD "claimDeployDao" boolean NOT NULL DEFAULT false`);
		await queryRunner.query(`ALTER TABLE "daos" ADD "isInternal" boolean NOT NULL DEFAULT false`);
		await queryRunner.query(`ALTER TYPE "public"."dao_membership_role_enum" RENAME TO "dao_membership_role_enum_old"`);
		await queryRunner.query(
			`CREATE TYPE "public"."dao_membership_role_enum" AS ENUM('CREATOR', 'MEMBER', 'WHITELIST')`
		);
		await queryRunner.query(`ALTER TABLE "dao_membership" ALTER COLUMN "role" DROP DEFAULT`);
		await queryRunner.query(
			`ALTER TABLE "dao_membership" ALTER COLUMN "role" TYPE "public"."dao_membership_role_enum" USING "role"::"text"::"public"."dao_membership_role_enum"`
		);
		await queryRunner.query(`ALTER TABLE "dao_membership" ALTER COLUMN "role" SET DEFAULT 'MEMBER'`);
		await queryRunner.query(`DROP TYPE "public"."dao_membership_role_enum_old"`);
		await queryRunner.query(
			`ALTER TABLE "whitelists" ADD CONSTRAINT "UQ_3a853225b93dc29e49bbb78eb54" UNIQUE ("daoId", "walletAddress", "target", "email")`
		);
		await queryRunner.query(
			`ALTER TABLE "attachments" ADD CONSTRAINT "FK_f54127860e8075e61dd7d95c80b" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "posts" ADD CONSTRAINT "FK_b29fe2a625774b639422f98681f" FOREIGN KEY ("daoId") REFERENCES "daos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "proposals" ADD CONSTRAINT "FK_08e15fa3cc356577c8e54bbc236" FOREIGN KEY ("daoId") REFERENCES "daos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "dao_membership" ADD CONSTRAINT "FK_c7efde93fe3cc05bbbd0ffdb178" FOREIGN KEY ("daoId") REFERENCES "daos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "dao_membership" DROP CONSTRAINT "FK_c7efde93fe3cc05bbbd0ffdb178"`);
		await queryRunner.query(`ALTER TABLE "proposals" DROP CONSTRAINT "FK_08e15fa3cc356577c8e54bbc236"`);
		await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_b29fe2a625774b639422f98681f"`);
		await queryRunner.query(`ALTER TABLE "attachments" DROP CONSTRAINT "FK_f54127860e8075e61dd7d95c80b"`);
		await queryRunner.query(`ALTER TABLE "whitelists" DROP CONSTRAINT "UQ_3a853225b93dc29e49bbb78eb54"`);
		await queryRunner.query(
			`CREATE TYPE "public"."dao_membership_role_enum_old" AS ENUM('CREATOR', 'MEMBER', 'WHITELIST')`
		);
		await queryRunner.query(`ALTER TABLE "dao_membership" ALTER COLUMN "role" DROP DEFAULT`);
		await queryRunner.query(
			`ALTER TABLE "dao_membership" ALTER COLUMN "role" TYPE "public"."dao_membership_role_enum_old" USING "role"::"text"::"public"."dao_membership_role_enum_old"`
		);
		await queryRunner.query(`ALTER TABLE "dao_membership" ALTER COLUMN "role" SET DEFAULT 'MEMBER'`);
		await queryRunner.query(`DROP TYPE "public"."dao_membership_role_enum"`);
		await queryRunner.query(`ALTER TYPE "public"."dao_membership_role_enum_old" RENAME TO "dao_membership_role_enum"`);
		await queryRunner.query(`ALTER TABLE "daos" DROP COLUMN "isInternal"`);
		await queryRunner.query(`ALTER TABLE "daos" DROP COLUMN "claimDeployDao"`);
		await queryRunner.query(
			`ALTER TABLE "whitelists" ADD CONSTRAINT "UQ_988f3c26b3aaed34ddfa61e5fdf" UNIQUE ("daoId", "walletAddress", "target")`
		);
		await queryRunner.query(
			`ALTER TABLE "dao_membership" ADD CONSTRAINT "FK_c7efde93fe3cc05bbbd0ffdb178" FOREIGN KEY ("daoId") REFERENCES "daos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "proposals" ADD CONSTRAINT "FK_08e15fa3cc356577c8e54bbc236" FOREIGN KEY ("daoId") REFERENCES "daos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "posts" ADD CONSTRAINT "FK_b29fe2a625774b639422f98681f" FOREIGN KEY ("daoId") REFERENCES "daos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "attachments" ADD CONSTRAINT "FK_f54127860e8075e61dd7d95c80b" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}
}
