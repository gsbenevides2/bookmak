/// <reference path="./typings.d.ts" />

import { getConnection } from "./getConnnection";

export const createCard = async (
  card: DatabaseCreateCardData[],
): Promise<null> => {
  const knex = getConnection();
  await knex<CardTable>("card").insert(
    card.map((data) => ({
      ...data.card,
      customerId: data.customerId,
    })),
  );
  await knex.destroy();
  return null;
};
