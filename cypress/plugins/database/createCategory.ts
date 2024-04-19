import { type CategoryTable } from "../../typings/databaseTables";
import { type CategoryFixtureData } from "../../typings/fixtures";
import { getConnection } from "./getConnnection";

export async function createCategory(
  categoryFixture: CategoryFixtureData,
): Promise<string> {
  const knex = getConnection();
  const [{ id }] = await knex<CategoryTable>("category")
    .insert(categoryFixture)
    .returning("id");
  await knex.destroy();
  return id;
}
