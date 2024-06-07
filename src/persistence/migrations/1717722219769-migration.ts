import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717722219769 implements MigrationInterface {
    name = 'Migration1717722219769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."card_flag" AS ENUM('mastercard', 'visa')`);
        await queryRunner.query(`CREATE TABLE "card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" character varying NOT NULL, "holder_name" character varying NOT NULL, "flag" "public"."card_flag" NOT NULL, "cvv" character varying(3) NOT NULL, "month_of_validity" character varying(2) NOT NULL, "year_of_validity" character varying(4) NOT NULL, "active" boolean NOT NULL DEFAULT true, "customer_id" uuid, CONSTRAINT "pk_card" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."coupon_type" AS ENUM('discount', 'exchange')`);
        await queryRunner.query(`CREATE TABLE "coupon" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "value" integer NOT NULL, "description" character varying NOT NULL, "type" "public"."coupon_type" NOT NULL, "used" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "attached_customer_id" uuid, CONSTRAINT "pk_coupon" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'uniformed', 'others')`);
        await queryRunner.query(`CREATE TYPE "public"."phone_type" AS ENUM('cellphone', 'landline')`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "cpf" character varying NOT NULL, "date_of_birth" TIMESTAMP NOT NULL, "gender" "public"."gender" NOT NULL, "phone_type" "public"."phone_type" NOT NULL, "phone_area_code" character varying NOT NULL, "phone_number" character varying NOT NULL, "is_active" boolean NOT NULL, "password" character varying NOT NULL, "is_admin" boolean NOT NULL DEFAULT false, "delivery_address_id" uuid NOT NULL, "billing_address_id" uuid NOT NULL, CONSTRAINT "unique_email" UNIQUE ("email"), CONSTRAINT "unique_cpf" UNIQUE ("cpf"), CONSTRAINT "unique_delivery_address_id" UNIQUE ("delivery_address_id"), CONSTRAINT "unique_billing_address_id" UNIQUE ("billing_address_id"), CONSTRAINT "pk_customer" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."house_type" AS ENUM('house', 'apartment', 'farm')`);
        await queryRunner.query(`CREATE TYPE "public"."street_type" AS ENUM('street', 'avenue', 'road', 'alley')`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "house_type" "public"."house_type" NOT NULL, "street_type" "public"."street_type" NOT NULL, "nickname" character varying NOT NULL, "street" character varying NOT NULL, "number" character varying NOT NULL, "district" character varying NOT NULL, "zip_code" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "observations" character varying, "active" boolean NOT NULL DEFAULT true, "customer_id" uuid, CONSTRAINT "pk_address" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "author" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "pk_author" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "pk_category" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "cover" character varying NOT NULL, "description" character varying NOT NULL, "bookmark_style" character varying, CONSTRAINT "pk_book" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_sku" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "cover" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "stock_quantity" integer NOT NULL, "book_id" uuid, CONSTRAINT "pk_book_sku" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "unit_sell_price" integer NOT NULL, "change_quantity" integer NOT NULL DEFAULT '0', "sku_id" uuid, "order_id" uuid, CONSTRAINT "pk_order_item" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_payment_method" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" integer NOT NULL, "card_id" uuid, "coupon_id" uuid, "order_id" uuid, CONSTRAINT "pk_order_payment_method" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subtotal" integer NOT NULL DEFAULT '0', "total_price" integer NOT NULL DEFAULT '0', "discounts" integer NOT NULL DEFAULT '0', "shipping_price" integer NOT NULL DEFAULT '0', "bookmark_style" character varying, "bookmark_text" character varying, "generated_bookmarks" text array NOT NULL DEFAULT ARRAY[]::text[], "customer_id" uuid, "billing_address_id" uuid, "shipping_address_id" uuid, CONSTRAINT "pk_order" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_update_order_status_enum" AS ENUM('processing', 'payment_approved', 'payment_rejected', 'preparing', 'sending', 'sended', 'exchanging', 'exchanged', 'exchange_rejected', 'canceled', 'canceling', 'cancel_rejected')`);
        await queryRunner.query(`CREATE TABLE "order_update" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_status" "public"."order_update_order_status_enum" NOT NULL, "observations" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "order_id" uuid, CONSTRAINT "pk_order_update" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_authors" ("book_id" uuid NOT NULL, "author_id" uuid NOT NULL, CONSTRAINT "pk_book_authors" PRIMARY KEY ("book_id", "author_id"))`);
        await queryRunner.query(`CREATE INDEX "idx_book_authors_book_id" ON "book_authors" ("book_id") `);
        await queryRunner.query(`CREATE INDEX "idx_book_authors_author_id" ON "book_authors" ("author_id") `);
        await queryRunner.query(`CREATE TABLE "book_categories" ("book_id" uuid NOT NULL, "category_id" uuid NOT NULL, CONSTRAINT "pk_book_categories" PRIMARY KEY ("book_id", "category_id"))`);
        await queryRunner.query(`CREATE INDEX "idx_book_categories_book_id" ON "book_categories" ("book_id") `);
        await queryRunner.query(`CREATE INDEX "idx_book_categories_category_id" ON "book_categories" ("category_id") `);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "fk_card_customer" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "fk_coupon_customer" FOREIGN KEY ("attached_customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "fk_customer_delivery_address" FOREIGN KEY ("delivery_address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "fk_customer_billing_address" FOREIGN KEY ("billing_address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "fk_address_customer" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_sku" ADD CONSTRAINT "fk_book_sku" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "fk_order_item_sku" FOREIGN KEY ("sku_id") REFERENCES "book_sku"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "fk_order_item" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_payment_method" ADD CONSTRAINT "fk_order_payment_method_card" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_payment_method" ADD CONSTRAINT "fk_order_payment_method_coupon" FOREIGN KEY ("coupon_id") REFERENCES "coupon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_payment_method" ADD CONSTRAINT "fk_order_payment_method" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "fk_order_customer" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "fk_order_billing_address" FOREIGN KEY ("billing_address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "fk_order_shipping_address" FOREIGN KEY ("shipping_address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_update" ADD CONSTRAINT "fk_order_update" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_authors" ADD CONSTRAINT "fk_book_author" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_authors" ADD CONSTRAINT "fk_author_book" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_categories" ADD CONSTRAINT "fb_book_category" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_categories" ADD CONSTRAINT "fk_category_book" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE VIEW "order_executed" AS SELECT DISTINCT "order_update"."timestamp" AS "timestamp", "order_update"."order_id" AS "order_id" FROM "order_update" "order_update" WHERE "order_update"."order_status" = 'processing'`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","order_executed","SELECT DISTINCT \"order_update\".\"timestamp\" AS \"timestamp\", \"order_update\".\"order_id\" AS \"order_id\" FROM \"order_update\" \"order_update\" WHERE \"order_update\".\"order_status\" = 'processing'"]);
        await queryRunner.query(`CREATE VIEW "order_selled_skus" AS SELECT "order_item"."quantity" AS "quantity", "order_executed"."timestamp" AS "selled_timestamp", "book_sku"."title" AS "title", "book_sku"."cover" AS "cover", "book"."title" AS "book_title", "order_item"."order_id" AS "order_id", "order_item"."sku_id" AS "sku_id", "order_item"."unit_sell_price" AS "unit_sell_price", "book_sku"."book_id" AS "book_id", array_agg(distinct "book_authors"."author_id") AS "authors", array_agg(distinct "book_categories"."category_id") AS "categories" FROM "order_item" "order_item" INNER JOIN "order_executed" "order_executed" ON "order_item"."order_id" = "order_executed"."order_id"  INNER JOIN "book_sku" "book_sku" ON "order_item"."sku_id" = "book_sku"."id"  INNER JOIN "book_authors" "book_authors" ON "book_authors"."book_id" = "book_sku"."book_id"  INNER JOIN "book_categories" "book_categories" ON "book_categories"."book_id" = "book_sku"."book_id"  INNER JOIN "book" "book" ON "book"."id" = "book_sku"."book_id" WHERE "order_item"."order_id" IN (SELECT "order_executed"."order_id" FROM "order_executed" "order_executed") GROUP BY "order_item"."order_id", "order_item"."sku_id", "order_item"."quantity", "order_item"."unit_sell_price", "order_executed"."timestamp", "book_sku"."title", "book_sku"."cover", "book_sku"."book_id", "book"."title"`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","order_selled_skus","SELECT \"order_item\".\"quantity\" AS \"quantity\", \"order_executed\".\"timestamp\" AS \"selled_timestamp\", \"book_sku\".\"title\" AS \"title\", \"book_sku\".\"cover\" AS \"cover\", \"book\".\"title\" AS \"book_title\", \"order_item\".\"order_id\" AS \"order_id\", \"order_item\".\"sku_id\" AS \"sku_id\", \"order_item\".\"unit_sell_price\" AS \"unit_sell_price\", \"book_sku\".\"book_id\" AS \"book_id\", array_agg(distinct \"book_authors\".\"author_id\") AS \"authors\", array_agg(distinct \"book_categories\".\"category_id\") AS \"categories\" FROM \"order_item\" \"order_item\" INNER JOIN \"order_executed\" \"order_executed\" ON \"order_item\".\"order_id\" = \"order_executed\".\"order_id\"  INNER JOIN \"book_sku\" \"book_sku\" ON \"order_item\".\"sku_id\" = \"book_sku\".\"id\"  INNER JOIN \"book_authors\" \"book_authors\" ON \"book_authors\".\"book_id\" = \"book_sku\".\"book_id\"  INNER JOIN \"book_categories\" \"book_categories\" ON \"book_categories\".\"book_id\" = \"book_sku\".\"book_id\"  INNER JOIN \"book\" \"book\" ON \"book\".\"id\" = \"book_sku\".\"book_id\" WHERE \"order_item\".\"order_id\" IN (SELECT \"order_executed\".\"order_id\" FROM \"order_executed\" \"order_executed\") GROUP BY \"order_item\".\"order_id\", \"order_item\".\"sku_id\", \"order_item\".\"quantity\", \"order_item\".\"unit_sell_price\", \"order_executed\".\"timestamp\", \"book_sku\".\"title\", \"book_sku\".\"cover\", \"book_sku\".\"book_id\", \"book\".\"title\""]);
        await queryRunner.query(`CREATE VIEW "last_updates" AS SELECT DISTINCT ON ("order_update"."order_id") "order_update"."id" AS "id", "order_update"."order_status" AS "status", "order_update"."timestamp" AS "timestamp", "order_update"."order_id" AS "order_id" FROM "order_update" "order_update" ORDER BY "order_update"."order_id" DESC, "order_update"."timestamp" DESC`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","last_updates","SELECT DISTINCT ON (\"order_update\".\"order_id\") \"order_update\".\"id\" AS \"id\", \"order_update\".\"order_status\" AS \"status\", \"order_update\".\"timestamp\" AS \"timestamp\", \"order_update\".\"order_id\" AS \"order_id\" FROM \"order_update\" \"order_update\" ORDER BY \"order_update\".\"order_id\" DESC, \"order_update\".\"timestamp\" DESC"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","last_updates","public"]);
        await queryRunner.query(`DROP VIEW "last_updates"`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","order_selled_skus","public"]);
        await queryRunner.query(`DROP VIEW "order_selled_skus"`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","order_executed","public"]);
        await queryRunner.query(`DROP VIEW "order_executed"`);
        await queryRunner.query(`ALTER TABLE "book_categories" DROP CONSTRAINT "fk_category_book"`);
        await queryRunner.query(`ALTER TABLE "book_categories" DROP CONSTRAINT "fb_book_category"`);
        await queryRunner.query(`ALTER TABLE "book_authors" DROP CONSTRAINT "fk_author_book"`);
        await queryRunner.query(`ALTER TABLE "book_authors" DROP CONSTRAINT "fk_book_author"`);
        await queryRunner.query(`ALTER TABLE "order_update" DROP CONSTRAINT "fk_order_update"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "fk_order_shipping_address"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "fk_order_billing_address"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "fk_order_customer"`);
        await queryRunner.query(`ALTER TABLE "order_payment_method" DROP CONSTRAINT "fk_order_payment_method"`);
        await queryRunner.query(`ALTER TABLE "order_payment_method" DROP CONSTRAINT "fk_order_payment_method_coupon"`);
        await queryRunner.query(`ALTER TABLE "order_payment_method" DROP CONSTRAINT "fk_order_payment_method_card"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "fk_order_item"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "fk_order_item_sku"`);
        await queryRunner.query(`ALTER TABLE "book_sku" DROP CONSTRAINT "fk_book_sku"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "fk_address_customer"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "fk_customer_billing_address"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "fk_customer_delivery_address"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "fk_coupon_customer"`);
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "fk_card_customer"`);
        await queryRunner.query(`DROP INDEX "public"."idx_book_categories_category_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_book_categories_book_id"`);
        await queryRunner.query(`DROP TABLE "book_categories"`);
        await queryRunner.query(`DROP INDEX "public"."idx_book_authors_author_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_book_authors_book_id"`);
        await queryRunner.query(`DROP TABLE "book_authors"`);
        await queryRunner.query(`DROP TABLE "order_update"`);
        await queryRunner.query(`DROP TYPE "public"."order_update_order_status_enum"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "order_payment_method"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "book_sku"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "author"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TYPE "public"."street_type"`);
        await queryRunner.query(`DROP TYPE "public"."house_type"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TYPE "public"."phone_type"`);
        await queryRunner.query(`DROP TYPE "public"."gender"`);
        await queryRunner.query(`DROP TABLE "coupon"`);
        await queryRunner.query(`DROP TYPE "public"."coupon_type"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP TYPE "public"."card_flag"`);
    }

}
