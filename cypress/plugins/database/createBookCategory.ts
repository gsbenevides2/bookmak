import { type BookCategoryTable } from "../../typings/databaseTables";
import { type BookCategoryFixureData } from "../../typings/fixures";
import { getConnection } from "./getConnnection";

export async function createBookCategory(
  fixure: BookCategoryFixureData,
): Promise<null> {
  const knex = getConnection();
  await knex<BookCategoryTable>("book_categories").insert(fixure);
  await knex.destroy();
  return null;
}
