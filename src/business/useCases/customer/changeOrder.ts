import { DatabaseConnection } from "../../../persistence/dbConnection";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";
import { throwErrorIfFalse } from "../../../utils/errors";
import checkOrderIsExchangeable from "./checkOrderIsExchangeable";
import { OrderItem } from "../../models/OrderItem";

export default async function changeOrder(
  orderId: string,
  accountId: string,
  items: string[],
): Promise<void> {
  throwErrorIfFalse(
    await checkOrderIsExchangeable(orderId, accountId),
    "O pedido não pode ser trocado",
  );
  const dataSource = await DatabaseConnection.getDataSource().catch((error) => {
    throw new Error("Erro ao conectar com o banco de dados: " + error);
  });

  dataSource
    .transaction(async (trx) => {
      const orderUpdateRepository = trx.getRepository(OrderUpdate);
      const orderItemRepository = trx.getRepository(OrderItem);
      for (const itemId of items) {
        await orderItemRepository.update(
          {
            id: itemId,
          },
          {
            inExchange: true,
          },
        );
      }
      await orderUpdateRepository.save({
        order: {
          id: orderId,
        },
        observations: "Estamos processando a troca. Aguarde!",
        status: OrderStatus.EXCHANGING,
      });
    })
    .catch((error) => {
      throw new Error("Erro ao trocar pedido: " + error);
    });
}
