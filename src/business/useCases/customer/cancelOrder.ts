import { DatabaseConnection } from "../../../persistence/dbConnection";
import { throwErrorIfFalse } from "../../../utils/errors";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";
import checkOrderIsCancelable from "./checkOrderIsCancelable";
import { faker } from "@faker-js/faker";
import cancelOrderAdmin from "../admin/cancelOrder";

export default async function cancelOrder(
  orderId: string,
  customerId: string,
): Promise<void> {
  throwErrorIfFalse(
    await checkOrderIsCancelable(orderId, customerId),
    "Pedido não pode ser cancelado",
  );
  const dataSource = await DatabaseConnection.getDataSource();
  const orderUpdateRespository = dataSource.getRepository(OrderUpdate);
  const orderUpdates = await orderUpdateRespository.find({
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
  });
  const [lastUpdate] = orderUpdates;

  if (
    lastUpdate.status === OrderStatus.SENDED ||
    lastUpdate.status === OrderStatus.SENDING
  ) {
    const returnCode = faker.string.alphanumeric(10);
    await orderUpdateRespository.save({
      order: {
        id: orderId,
      },
      status: OrderStatus.CANCELING,
      observations: `Seu pedido está sendo cancelado. Como ele já foi enviado, segue o código de devolução: ${returnCode} assim que o pedido for devolvido, o valor será estornado.`,
    });
    return;
  }
  await orderUpdateRespository.save({
    order: {
      id: orderId,
    },
    status: OrderStatus.CANCELING,
    observations: "Seu pedido está sendo cancelado. O valor será estornado.",
  });
  await cancelOrderAdmin(orderId);
}
