import { DatabaseConnection } from "../../../persistence/dbConnection";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";

export default async function checkOrderIsExchangeable(
  orderId: string,
  cutomerId: string,
): Promise<boolean> {
  const orderUpdates = await (await DatabaseConnection.getDataSource())
    .getRepository(OrderUpdate)
    .findOne({
      where: {
        order: {
          id: orderId,
          customer: {
            id: cutomerId,
          },
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
  return orderUpdates?.status === OrderStatus.SENDED;
}
