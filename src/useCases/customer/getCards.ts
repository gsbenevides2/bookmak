import { DatabaseConnection } from "../../dbConnection";
import { Card } from "../../models/Card";

function formatCardNumber(cardNumber: string): string {
  const lastFourDigits = cardNumber.slice(-4);
  return `****.****.****.${lastFourDigits}`;
}

export async function getCards(accountId: string): Promise<Card[]> {
  const datasource = await DatabaseConnection.getDataSource().catch(() => {
    throw new Error("Erro ao conectar com o banco de dados");
  });
  const cards = await datasource.getRepository(Card).find({
    where: { customer: { id: accountId }, active: true },
  });

  return cards.map((card) => ({
    ...card,
    number: formatCardNumber(card.number),
    cvv: "***",
  }));
}
