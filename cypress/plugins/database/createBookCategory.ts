import { type BookCategoryTable } from "../../typings/databaseTables";
import { type BookCategoryFixureData } from "../../typings/fixures";
import { getConnection } from "./getConnnection";

export async function createBookCategory(
  fixure: BookCategoryFixureData,
): Promise<void> {
  const knex = getConnection();
  await knex<BookCategoryTable>("book_category").insert(fixure);
  await knex.destroy();
}
