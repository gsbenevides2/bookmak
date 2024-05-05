import { DatabaseConnection } from "../../../persistence/dbConnection";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";
import { throwErrorIfFalse } from "../../../utils/errors";
import checkOrderIsExchangeable from "./checkOrderIsExchangeable";

export default async function changeOrder(
  orderId: string,
  accountId: string,
): Promise<void> {
  throwErrorIfFalse(
    await checkOrderIsExchangeable(orderId, accountId),
    "O pedido não pode ser trocado",
  );
  await (await DatabaseConnection.getDataSource())
    .getRepository(OrderUpdate)
    .save({
      order: {
        id: orderId,
      },
      observations: "Estamos processando a troca. Aguarde!",
      status: OrderStatus.EXCHANGING,
    });
}
