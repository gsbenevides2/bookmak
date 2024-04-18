import { DatabaseConnection } from "../../dbConnection";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";
import { throwErrorIfFalse } from "../../utils/errors";
import checkOrderIsExchangeable from "./checkOrderIsExchangeable";

export default async function aproveExchange(orderId: string): Promise<void> {
  throwErrorIfFalse(
    await checkOrderIsExchangeable(orderId),
    "O pedido não pode ser trocado",
  );
  await (await DatabaseConnection.getDataSource())
    .getRepository(OrderUpdate)
    .save({
      order: {
        id: orderId,
      },
      observations: "Seu pedido de troca foi aprovado",
      status: OrderStatus.EXCHANGED,
    });
}
