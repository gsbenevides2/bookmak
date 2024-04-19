import { type BookCategoryTable } from "../../typings/databaseTables";
import { type BookCategoryFixtureData } from "../../typings/fixtures";
import { getConnection } from "./getConnnection";

export async function createBookCategory(
  fixture: BookCategoryFixtureData,
): Promise<null> {
  const knex = getConnection();
  await knex<BookCategoryTable>("book_categories").insert(fixture);
  await knex.destroy();
  return null;
}
