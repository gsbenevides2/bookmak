import { DatabaseConnection } from "../../dbConnection";
import { Card } from "../../models/Card";

export default async function deleteCard(
  cardId: string,
  customerId: string,
): Promise<void> {
  const datasource = await DatabaseConnection.getDataSource().catch(() => {
    throw new Error("Erro ao conectar com o banco de dados");
  });

  const cardRepository = datasource.getRepository(Card);

  const card = await cardRepository.findOne({
    where: { id: cardId, customer: { id: customerId } },
  });

  if (card == null) {
    throw new Error("Cartão não encontrado");
  }

  card.active = false;

  await cardRepository.save(card).catch(() => {
    throw new Error("Erro ao deletar o cartão");
  });
}
