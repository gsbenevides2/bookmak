import { DatabaseConnection } from "../../../persistence/dbConnection";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";
import {
  secure,
  throwErrorIfFalse,
  throwErrorIfTrue,
} from "../../../utils/errors";
import checkOrderIsExchangeable from "./checkOrderIsExchangeable";
import { OrderItem } from "../../models/OrderItem";

type ItemsQuantity = Record<string, string>;

export default async function changeOrder(
  orderId: string,
  accountId: string,
  itemsQuantity: ItemsQuantity,
): Promise<void> {
  throwErrorIfFalse(
    await checkOrderIsExchangeable(orderId, accountId),
    "O pedido não pode ser trocado",
  );
  const dataSource = await DatabaseConnection.getDataSource().catch((error) => {
    throw new Error("Erro ao conectar com o banco de dados: " + error);
  });
  // Check if all values are positive
  for (const key in itemsQuantity) {
    const numberValue = secure(
      () => Number(itemsQuantity[key]),
      "Erro ao converter valor",
    );
    throwErrorIfTrue(numberValue < 0, "Quantidade inválida");
  }

  dataSource
    .transaction(async (trx) => {
      const orderUpdateRepository = trx.getRepository(OrderUpdate);
      const orderItemRepository = trx.getRepository(OrderItem);
      for (const itemId in itemsQuantity) {
        const itemQuantity = secure(
          () => Number(itemsQuantity[itemId]),
          "Erro ao converter valor",
        );
        await orderItemRepository.update(
          {
            id: itemId,
          },
          {
            changeQuantity: itemQuantity,
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
