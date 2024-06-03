import { DatabaseConnection } from "../../../persistence/dbConnection";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";

export default async function checkOrderIsCancelable(
  orderId: string,
): Promise<boolean> {
  const lastOrderStatus = await (await DatabaseConnection.getDataSource())
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
      relations: {
        order: {
          customer: true,
        },
      },
    });
  return lastOrderStatus?.status === OrderStatus.CANCELING;
}
