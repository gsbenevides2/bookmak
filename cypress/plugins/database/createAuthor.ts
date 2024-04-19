import { type AuthorTable } from "../../typings/databaseTables";
import { type AuthorFixtureData } from "../../typings/fixtures";
import { getConnection } from "./getConnnection";

export async function createAuthor(
  fixture: AuthorFixtureData,
): Promise<string> {
  const knex = getConnection();
  const [{ id }] = await knex<AuthorTable>("author")
    .insert(fixture)
    .returning("id");
  await knex.destroy();

  return id;
}
