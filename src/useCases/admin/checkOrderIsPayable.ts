import { DatabaseConnection } from "../../dbConnection";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";

export default async function checkOrderIsPayable(
  orderId: string,
): Promise<boolean> {
  const datasource = await DatabaseConnection.getDataSource();
  const orderUpdateRepository = datasource.getRepository(OrderUpdate);
  const lastOrderUpdate = await orderUpdateRepository.findOne({
    where: {
      order: {
        id: orderId,
      },
    },
    order: {
      timestamp: "DESC",
    },
  });

  return lastOrderUpdate?.status === OrderStatus.PROCESSING;
}
