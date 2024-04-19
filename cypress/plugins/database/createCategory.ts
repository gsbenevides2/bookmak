import { type CategoryTable } from "../../typings/databaseTables";
import { type CategoryFixureData } from "../../typings/fixures";
import { getConnection } from "./getConnnection";

export async function createCategory(
  categoryFixure: CategoryFixureData,
): Promise<string> {
  const knex = getConnection();
  const [{ id }] = await knex<CategoryTable>("category")
    .insert(categoryFixure)
    .returning("id");
  await knex.destroy();
  return id;
}
