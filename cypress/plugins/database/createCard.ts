import { type CardTable } from "../../typings/databaseTables";
import { type CardFixureData } from "../../typings/fixures";
import { getConnection } from "./getConnnection";

interface CreateDatabaseCardData {
  cardData: CardFixureData;
  customerId: string;
}

export async function createCard(
  params: CreateDatabaseCardData,
): Promise<string> {
  const { cardData, customerId } = params;
  const knex = getConnection();
  const [{ id: cardId }] = await knex<CardTable>("card")
    .insert({
      number: cardData.number,
      holderName: cardData.holderName,
      flag: cardData.flag,
      cvv: cardData.cvv,
      monthOfValidity: cardData.monthOfValidity,
      yearOfValidity: cardData.yearOfValidity,
      customerId,
      active: cardData.active,
    })
    .returning("id");
  await knex.destroy();
  return cardId;
}
