import { type BookAuthorTable } from "../../typings/databaseTables";
import { type BookAuthorFixtureData } from "../../typings/fixtures";
import { getConnection } from "./getConnnection";

export async function createBookAuthor(
  fixture: BookAuthorFixtureData,
): Promise<null> {
  const knex = getConnection();
  await knex<BookAuthorTable>("book_authors").insert(fixture);
  await knex.destroy();
  return null;
}
