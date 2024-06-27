import { type MigrationInterface, type QueryRunner } from "typeorm";

export class Migration1719446082367 implements MigrationInterface {
  name = "Migration1719446082367";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book" ADD "is_active" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "is_active"`);
  }
}
