import { OrderStatusEnum } from "../../../apresentation/views/locals";
import { DatabaseConnection } from "../../../persistence/dbConnection";
import { OrderUpdate } from "../../models/OrderUpdate";

export default async function checkOrderIsCancelable(
  orderId: string,
  customerId: string,
): Promise<boolean> {
  const notCancelableStatus = [
    OrderStatusEnum.CANCELED,
    OrderStatusEnum.CANCELING,
    OrderStatusEnum.CANCEL_REJECTED,
    OrderStatusEnum.EXCHANGING,
    OrderStatusEnum.EXCHANGED,
    OrderStatusEnum.EXCHANGE_REJECTED,
    OrderStatusEnum.PAYMENT_REJECTED,
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
