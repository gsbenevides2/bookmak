import { DatabaseConnection } from "../../dbConnection";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";
import { throwErrorIfFalse } from "../../utils/errors";
import checkOrderIsSended from "./checkOrderIsSended";

export default async function finishOrder(orderId: string): Promise<void> {
  throwErrorIfFalse(
    await checkOrderIsSended(orderId),
    "Esse pedido não pode ser finalizado",
  );
  await (await DatabaseConnection.getDataSource())
    .getRepository(OrderUpdate)
    .save({
      order: { id: orderId },
      observations: " Seu pedido foi entregue com sucesso.",
      status: OrderStatus.SENDED,
    });
}
