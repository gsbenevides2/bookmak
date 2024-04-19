import { type BookTable } from "../../typings/databaseTables";
import { type BookFixtureData } from "../../typings/fixtures";
import { getConnection } from "./getConnnection";

export async function createBook(
  bookFixture: BookFixtureData,
): Promise<string> {
  const knex = getConnection();
  const [{ id }] = await knex<BookTable>("book")
    .insert(bookFixture)
    .returning("id");
  await knex.destroy();
  return id;
}
