import { DatabaseConnection } from "../../dbConnection";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";
import { throwErrorIfFalse } from "../../utils/errors";
import checkOrderIsPreparing from "./checkOrderIsPreparing";

export default async function sendOrder(
  orderId: string,
  transporter: string,
  trackCode: string,
): Promise<void> {
  const sanitizedTransporter = transporter.trim();
  throwErrorIfFalse(
    sanitizedTransporter.length > 0,
    "A transportadora é obrigatória",
  );
  const sanitizedTrackCode = trackCode.trim();
  throwErrorIfFalse(
    sanitizedTrackCode.length > 0,
    "O código de rastreio é obrigatório",
  );
  throwErrorIfFalse(
    await checkOrderIsPreparing(orderId),
    "Esse pedido não pode ser enviado",
  );

  const dataSource = await DatabaseConnection.getDataSource();
  const orderRepository = dataSource.getRepository(OrderUpdate);
  await orderRepository.save({
    order: {
      id: orderId,
    },
    status: OrderStatus.SENDING,
    observations: `Seu pedido está com a transportadora ${sanitizedTransporter}, o código de rastreio é: ${sanitizedTrackCode}.`,
  });
}
