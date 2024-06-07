/// <reference path="./typings.d.ts" />

import { getConnection } from "./getConnnection";

export const createCard = async (
  card: DatabaseCreateCardData[],
): Promise<null> => {
  const knex = getConnection();
  const cardOk: CardTable[] = card.map((data) => {
    const { holderName, monthOfValidity, yearOfValidity, ...rest } = data.card;
    return {
      ...rest,
      active: data.active ?? true,
      holder_name: holderName,
      month_of_validity: monthOfValidity,
      year_of_validity: yearOfValidity,
      customer_id: data.customer_id,
    };
  });
  await knex<CardTable>("card").insert(cardOk);
  await knex.destroy();
  return null;
};
