import { DatabaseConnection } from "../../../persistence/dbConnection";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";
import checkOrderIsPayed from "./checkOrderIsPayed";

export default async function startPreparing(orderId: string): Promise<void> {
  const isPayed = await checkOrderIsPayed(orderId);
  if (!isPayed) {
    throw new Error("O pedido não foi pago");
  }
  const dataSource = await DatabaseConnection.getDataSource();
  await dataSource.getRepository(OrderUpdate).save({
    order: {
      id: orderId,
    },
    observations:
      "Seu pedido está sendo preparado para envio, logo você receberá o código de rastreio.",
    status: OrderStatus.PREPARING,
  });
}
