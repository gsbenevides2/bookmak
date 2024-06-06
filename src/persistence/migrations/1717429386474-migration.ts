import { type MigrationInterface, type QueryRunner } from "typeorm";

export class Migration1717429386474 implements MigrationInterface {
  name = "Migration1717429386474";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(
      `CREATE TYPE "public"."card_flag_enum" AS ENUM('mastercard', 'visa')`,
    );
    await queryRunner.query(
      `CREATE TABLE "card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" character varying NOT NULL, "holderName" character varying NOT NULL, "flag" "public"."card_flag_enum" NOT NULL, "cvv" character varying NOT NULL, "monthOfValidity" character varying NOT NULL, "yearOfValidity" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "customerId" uuid, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."coupon_type_enum" AS ENUM('discount', 'exchange')`,
    );
    await queryRunner.query(
      `CREATE TABLE "coupon" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "value" integer NOT NULL, "description" character varying NOT NULL, "type" "public"."coupon_type_enum" NOT NULL, "used" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "attachedCustomerId" uuid, CONSTRAINT "PK_fcbe9d72b60eed35f46dc35a682" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."customer_gender_enum" AS ENUM('male', 'female', 'uniformed', 'others')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."customer_phonetype_enum" AS ENUM('cellphone', 'landline')`,
    );
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "cpf" character varying NOT NULL, "dateOfBirth" TIMESTAMP NOT NULL, "gender" "public"."customer_gender_enum" NOT NULL, "phoneType" "public"."customer_phonetype_enum" NOT NULL, "phoneAreaCode" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "isActive" boolean NOT NULL, "password" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "deliveryAddressId" uuid NOT NULL, "billingAddressId" uuid NOT NULL, CONSTRAINT "unique_email" UNIQUE ("email"), CONSTRAINT "unique_cpf" UNIQUE ("cpf"), CONSTRAINT "REL_c3cbbd1a0dd18665056c09b04b" UNIQUE ("deliveryAddressId"), CONSTRAINT "REL_c25bd44357205bdffc041b7bd0" UNIQUE ("billingAddressId"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."address_housetype_enum" AS ENUM('house', 'apartment', 'farm')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."address_streettype_enum" AS ENUM('street', 'avenue', 'road', 'alley')`,
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "houseType" "public"."address_housetype_enum" NOT NULL, "streetType" "public"."address_streettype_enum" NOT NULL, "nickname" character varying NOT NULL, "street" character varying NOT NULL, "number" character varying NOT NULL, "district" character varying NOT NULL, "zipCode" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "observations" character varying, "active" boolean NOT NULL DEFAULT true, "customerId" uuid, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "author" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "book" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "cover" character varying NOT NULL, "description" character varying NOT NULL, "bookmarkStyle" character varying, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "book_sku" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "cover" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "stockQuantity" integer NOT NULL, "bookId" uuid, CONSTRAINT "PK_3543e12366b15e2ee53090efdb0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "unitSellPrice" integer NOT NULL, "changeQuantity" integer NOT NULL DEFAULT '0', "skuId" uuid, "orderId" uuid, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_payment_method" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" integer NOT NULL, "cardId" uuid, "couponId" uuid, "orderId" uuid, CONSTRAINT "PK_451b11cb12bc07db00d19c5a511" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subtotal" integer NOT NULL DEFAULT '0', "totalPrice" integer NOT NULL DEFAULT '0', "discounts" integer NOT NULL DEFAULT '0', "shippingPrice" integer NOT NULL DEFAULT '0', "bookmarkStyle" character varying, "bookmarkText" character varying, "generatedBookmarks" text array NOT NULL DEFAULT ARRAY[]::text[], "customerId" uuid, "billingAddressId" uuid, "shippingAddressId" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_update_status_enum" AS ENUM('processing', 'payment_approved', 'payment_rejected', 'preparing', 'sending', 'sended', 'exchanging', 'exchanged', 'exchange_rejected', 'canceled', 'canceling', 'cancel_rejected')`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_update" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."order_update_status_enum" NOT NULL, "observations" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "orderId" uuid, CONSTRAINT "PK_207a75b31eaa2f1fbbaac99ab30" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "book_authors" ("authorId" uuid NOT NULL, "bookId" uuid NOT NULL, CONSTRAINT "PK_167ae201537b9bc226186c57a36" PRIMARY KEY ("authorId", "bookId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7afd39332b56e49bdfdf8046ef" ON "book_authors" ("authorId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8433d38595493ad358f0cb0a58" ON "book_authors" ("bookId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "book_categories" ("categoryId" uuid NOT NULL, "bookId" uuid NOT NULL, CONSTRAINT "PK_497881108e5c8f27e9228233207" PRIMARY KEY ("categoryId", "bookId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fcdf094e1e43afe76a6c95138c" ON "book_categories" ("categoryId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_11a8804bb7f4ae35b4a5a118b1" ON "book_categories" ("bookId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_24417d8b8b30d2d57943ba2461b" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon" ADD CONSTRAINT "FK_a523b089c5904806e71a6cf93cf" FOREIGN KEY ("attachedCustomerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD CONSTRAINT "FK_c3cbbd1a0dd18665056c09b04b5" FOREIGN KEY ("deliveryAddressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD CONSTRAINT "FK_c25bd44357205bdffc041b7bd04" FOREIGN KEY ("billingAddressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_dc34d382b493ade1f70e834c4d3" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_sku" ADD CONSTRAINT "FK_1a18b1910eea9dd26736bab1922" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "FK_bdc2d278627b5fac25e1c7df033" FOREIGN KEY ("skuId") REFERENCES "book_sku"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_payment_method" ADD CONSTRAINT "FK_e497e768a192c8da16d1409568f" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_payment_method" ADD CONSTRAINT "FK_4479fdf8511937f256239939453" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_payment_method" ADD CONSTRAINT "FK_e5fa6171f68cafc44e87996e314" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_24170e5e670d4ee3a573c259203" FOREIGN KEY ("billingAddressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_a9e568150eecef07380e7f5fc7c" FOREIGN KEY ("shippingAddressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_update" ADD CONSTRAINT "FK_7ffffaaf4f5dbbc72d9a6a781b3" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_authors" ADD CONSTRAINT "FK_7afd39332b56e49bdfdf8046ef2" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_authors" ADD CONSTRAINT "FK_8433d38595493ad358f0cb0a581" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_categories" ADD CONSTRAINT "FK_fcdf094e1e43afe76a6c95138c9" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_categories" ADD CONSTRAINT "FK_11a8804bb7f4ae35b4a5a118b1b" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE VIEW "order_executed" AS SELECT DISTINCT "orderUpdate"."timestamp" AS "timestamp", "orderUpdate"."orderId" AS "orderId" FROM "order_update" "orderUpdate" WHERE "orderUpdate"."status" = 'processing'`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        "public",
        "VIEW",
        "order_executed",
        'SELECT DISTINCT "orderUpdate"."timestamp" AS "timestamp", "orderUpdate"."orderId" AS "orderId" FROM "order_update" "orderUpdate" WHERE "orderUpdate"."status" = \'processing\'',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "order_selled_skus" AS SELECT "orderItem"."quantity" AS "quantity", "orderItem"."unitSellPrice" AS "unitSellPrice", "orderExecuted"."timestamp" AS "selledTimestamp", "bookSku"."title" AS "title", "bookSku"."cover" AS "cover", "book"."title" AS "bookTitle", "orderItem"."orderId" AS "orderId", "orderItem"."skuId" AS "skuId", "bookSku"."bookId" AS "bookId", array_agg(distinct "bookAuthors"."authorId") AS "authors", array_agg(distinct "bookCategories"."categoryId") AS "categories" FROM "order_item" "orderItem" INNER JOIN "order_executed" "orderExecuted" ON "orderItem"."orderId" = "orderExecuted"."orderId"  INNER JOIN "book_sku" "bookSku" ON "orderItem"."skuId" = "bookSku"."id"  INNER JOIN "book_authors" "bookAuthors" ON "bookAuthors"."bookId" = "bookSku"."bookId"  INNER JOIN "book_categories" "bookCategories" ON "bookCategories"."bookId" = "bookSku"."bookId"  INNER JOIN "book" "book" ON "book"."id" = "bookSku"."bookId" WHERE "orderItem"."orderId" IN (SELECT "orderExecuted"."orderId" AS "orderExecuted_orderId" FROM "order_executed" "orderExecuted") GROUP BY "orderItem"."orderId", "orderItem"."skuId", "orderItem"."quantity", "orderItem"."unitSellPrice", "orderExecuted"."timestamp", "bookSku"."title", "bookSku"."cover", "bookSku"."bookId", "book"."title"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        "public",
        "VIEW",
        "order_selled_skus",
        'SELECT "orderItem"."quantity" AS "quantity", "orderItem"."unitSellPrice" AS "unitSellPrice", "orderExecuted"."timestamp" AS "selledTimestamp", "bookSku"."title" AS "title", "bookSku"."cover" AS "cover", "book"."title" AS "bookTitle", "orderItem"."orderId" AS "orderId", "orderItem"."skuId" AS "skuId", "bookSku"."bookId" AS "bookId", array_agg(distinct "bookAuthors"."authorId") AS "authors", array_agg(distinct "bookCategories"."categoryId") AS "categories" FROM "order_item" "orderItem" INNER JOIN "order_executed" "orderExecuted" ON "orderItem"."orderId" = "orderExecuted"."orderId"  INNER JOIN "book_sku" "bookSku" ON "orderItem"."skuId" = "bookSku"."id"  INNER JOIN "book_authors" "bookAuthors" ON "bookAuthors"."bookId" = "bookSku"."bookId"  INNER JOIN "book_categories" "bookCategories" ON "bookCategories"."bookId" = "bookSku"."bookId"  INNER JOIN "book" "book" ON "book"."id" = "bookSku"."bookId" WHERE "orderItem"."orderId" IN (SELECT "orderExecuted"."orderId" AS "orderExecuted_orderId" FROM "order_executed" "orderExecuted") GROUP BY "orderItem"."orderId", "orderItem"."skuId", "orderItem"."quantity", "orderItem"."unitSellPrice", "orderExecuted"."timestamp", "bookSku"."title", "bookSku"."cover", "bookSku"."bookId", "book"."title"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "last_updates" AS SELECT DISTINCT ON ("orderUpdate"."orderId") "orderUpdate"."id" AS "id", "orderUpdate"."status" AS "status", "orderUpdate"."timestamp" AS "timestamp", "orderUpdate"."orderId" AS "orderId" FROM "order_update" "orderUpdate" ORDER BY "orderUpdate"."orderId" DESC, "orderUpdate"."timestamp" DESC`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        "public",
        "VIEW",
        "last_updates",
        'SELECT DISTINCT ON ("orderUpdate"."orderId") "orderUpdate"."id" AS "id", "orderUpdate"."status" AS "status", "orderUpdate"."timestamp" AS "timestamp", "orderUpdate"."orderId" AS "orderId" FROM "order_update" "orderUpdate" ORDER BY "orderUpdate"."orderId" DESC, "orderUpdate"."timestamp" DESC',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ["VIEW", "last_updates", "public"],
    );
    await queryRunner.query(`DROP VIEW "last_updates"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ["VIEW", "order_selled_skus", "public"],
    );
    await queryRunner.query(`DROP VIEW "order_selled_skus"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ["VIEW", "order_executed", "public"],
    );
    await queryRunner.query(`DROP VIEW "order_executed"`);
    await queryRunner.query(
      `ALTER TABLE "book_categories" DROP CONSTRAINT "FK_11a8804bb7f4ae35b4a5a118b1b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_categories" DROP CONSTRAINT "FK_fcdf094e1e43afe76a6c95138c9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_authors" DROP CONSTRAINT "FK_8433d38595493ad358f0cb0a581"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_authors" DROP CONSTRAINT "FK_7afd39332b56e49bdfdf8046ef2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_update" DROP CONSTRAINT "FK_7ffffaaf4f5dbbc72d9a6a781b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_a9e568150eecef07380e7f5fc7c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_24170e5e670d4ee3a573c259203"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_payment_method" DROP CONSTRAINT "FK_e5fa6171f68cafc44e87996e314"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_payment_method" DROP CONSTRAINT "FK_4479fdf8511937f256239939453"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_payment_method" DROP CONSTRAINT "FK_e497e768a192c8da16d1409568f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "FK_bdc2d278627b5fac25e1c7df033"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_sku" DROP CONSTRAINT "FK_1a18b1910eea9dd26736bab1922"`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_dc34d382b493ade1f70e834c4d3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" DROP CONSTRAINT "FK_c25bd44357205bdffc041b7bd04"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" DROP CONSTRAINT "FK_c3cbbd1a0dd18665056c09b04b5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon" DROP CONSTRAINT "FK_a523b089c5904806e71a6cf93cf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_24417d8b8b30d2d57943ba2461b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_11a8804bb7f4ae35b4a5a118b1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fcdf094e1e43afe76a6c95138c"`,
    );
    await queryRunner.query(`DROP TABLE "book_categories"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8433d38595493ad358f0cb0a58"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7afd39332b56e49bdfdf8046ef"`,
    );
    await queryRunner.query(`DROP TABLE "book_authors"`);
    await queryRunner.query(`DROP TABLE "order_update"`);
    await queryRunner.query(`DROP TYPE "public"."order_update_status_enum"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "order_payment_method"`);
    await queryRunner.query(`DROP TABLE "order_item"`);
    await queryRunner.query(`DROP TABLE "book_sku"`);
    await queryRunner.query(`DROP TABLE "book"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "author"`);
    await queryRunner.query(`DROP TABLE "address"`);
    await queryRunner.query(`DROP TYPE "public"."address_streettype_enum"`);
    await queryRunner.query(`DROP TYPE "public"."address_housetype_enum"`);
    await queryRunner.query(`DROP TABLE "customer"`);
    await queryRunner.query(`DROP TYPE "public"."customer_phonetype_enum"`);
    await queryRunner.query(`DROP TYPE "public"."customer_gender_enum"`);
    await queryRunner.query(`DROP TABLE "coupon"`);
    await queryRunner.query(`DROP TYPE "public"."coupon_type_enum"`);
    await queryRunner.query(`DROP TABLE "card"`);
    await queryRunner.query(`DROP TYPE "public"."card_flag_enum"`);
  }
}
