import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1719108974989 implements MigrationInterface {
  name = "Migration1719108974989";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "session" ("expiredAt" bigint NOT NULL, "id" character varying(255) NOT NULL, "json" text NOT NULL, "destroyedAt" TIMESTAMP, CONSTRAINT "pk_session" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_session_expiredAt" ON "session" ("expiredAt") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."idx_session_expiredAt"`);
    await queryRunner.query(`DROP TABLE "session"`);
  }
}
