import { DatabaseConnection } from "../../dbConnection";
import { Card } from "../../models/Card";

interface ReturnCard {
  id: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCVV: string;
  cardBrand: string;
}

function formatCardNumber(cardNumber: string): string {
  const lastFourDigits = cardNumber.slice(-4);
  return `****.****.****.${lastFourDigits}`;
}

export async function getCards(accountId: string): Promise<ReturnCard[]> {
  const datasource = await DatabaseConnection.getDataSource().catch(() => {
    throw new Error("Erro ao conectar com o banco de dados");
  });
  const cards = await datasource.getRepository(Card).find({
    where: { customer: { id: accountId }, active: true },
  });

  return cards.map((card) => ({
    id: card.id,
    cardNumber: formatCardNumber(card.number),
    cardName: card.holderName,
    cardExpiry: `${card.monthOfValidity}/${card.yearOfValidity}`,
    cardCVV: "***",
    cardBrand: card.flag,
  }));
}
