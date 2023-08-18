import { MigrationInterface, QueryRunner } from 'typeorm';

export class earlyadoptersscoring21669626080864 implements MigrationInterface {
	name = 'earlyadoptersscoring21669626080864';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE "scoring_audience_early_adopters" (
                "wallet" character varying NOT NULL,
                "name" character varying NOT NULL,
                "score" integer NOT NULL,
                "ethBalance" integer NOT NULL,
                "nftsCount" integer NOT NULL,
                "twitterFollowersCount" integer NOT NULL,
                CONSTRAINT "PK_58659ede62468eeb977eefbf235" PRIMARY KEY ("wallet")
            )
        `);
		await queryRunner.query(
			`CREATE INDEX "IDX_1ebdac80317b035b48fa8a2a13" ON "scoring_audience_early_adopters" ("score") `
		);
		// insert 25 early adopters mock data
		await queryRunner.query(`
            INSERT INTO "scoring_audience_early_adopters" ("wallet", "name", "score", "ethBalance", "nftsCount", "twitterFollowersCount")
            VALUES
                ('0x0000000000000000000000000000000000000001', 'Early Adopter 1', 100, 100, 100, 100),
                ('0x0000000000000000000000000000000000000002', 'Early Adopter 2', 90, 90, 90, 90),
                ('0x0000000000000000000000000000000000000003', 'Early Adopter 3', 80, 80, 80, 80),
                ('0x0000000000000000000000000000000000000004', 'Early Adopter 4', 70, 70, 70, 70),
                ('0x0000000000000000000000000000000000000005', 'Early Adopter 5', 60, 60, 60, 60),
                ('0x0000000000000000000000000000000000000006', 'Early Adopter 6', 50, 50, 50, 50),
                ('0x0000000000000000000000000000000000000007', 'Early Adopter 7', 40, 40, 40, 40),
                ('0x0000000000000000000000000000000000000008', 'Early Adopter 8', 30, 30, 30, 30),
                ('0x0000000000000000000000000000000000000009', 'Early Adopter 9', 20, 20, 20, 20),
                ('0x0000000000000000000000000000000000000010', 'Early Adopter 10', 10, 10, 10, 10),
                ('0x0000000000000000000000000000000000000011', 'Early Adopter 11', 9, 9, 9, 9),
                ('0x0000000000000000000000000000000000000012', 'Early Adopter 12', 8, 8, 8, 8),
                ('0x0000000000000000000000000000000000000013', 'Early Adopter 13', 7, 7, 7, 7),
                ('0x0000000000000000000000000000000000000014', 'Early Adopter 14', 6, 6, 6, 6),
                ('0x0000000000000000000000000000000000000015', 'Early Adopter 15', 5, 5, 5, 5),
                ('0x0000000000000000000000000000000000000016', 'Early Adopter 16', 4, 4, 4, 4),
                ('0x0000000000000000000000000000000000000017', 'Early Adopter 17', 3, 3, 3, 3),
                ('0x0000000000000000000000000000000000000018', 'Early Adopter 18', 2, 2, 2, 2),
                ('0x0000000000000000000000000000000000000019', 'Early Adopter 19', 1, 1, 1, 1),
                ('0x0000000000000000000000000000000000000020', 'Early Adopter 20', 0, 0, 0, 0)
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "scoring_audience_early_adopters"`);
	}
}
