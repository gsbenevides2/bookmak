import { DatabaseConnection } from "../../../persistence/dbConnection";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";

export default async function checkOrderIsCancelable(
  orderId: string,
  customerId: string,
): Promise<boolean> {
  const notCancelableStatus = [
    OrderStatus.CANCELED,
    OrderStatus.CANCELING,
    OrderStatus.CANCEL_REJECTED,
    OrderStatus.EXCHANGING,
    OrderStatus.EXCHANGED,
    OrderStatus.EXCHANGE_REJECTED,
    OrderStatus.PAYMENT_REJECTED,
  ];
  const orderUpdates = await (await DatabaseConnection.getDataSource())

    .getRepository(OrderUpdate)
    .find({
      where: {
        order: {
          id: orderId,
          customer: {
            id: customerId,
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
  return orderUpdates.every(
    (update) => !notCancelableStatus.includes(update.status),
  );
}
