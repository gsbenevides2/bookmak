import { DatabaseConnection } from "../../dbConnection";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";

export default async function checkOrderIsExchangeable(
  orderId: string,
): Promise<boolean> {
  const orderUpdate = await (await DatabaseConnection.getDataSource())
    .getRepository(OrderUpdate)
    .findOne({
      where: {
        order: {
          id: orderId,
        },
      },
      order: {
        timestamp: "DESC",
      },
    });
  return orderUpdate?.status === OrderStatus.EXCHANGING;
}
