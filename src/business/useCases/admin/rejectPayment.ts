import { DatabaseConnection } from "../../../persistence/dbConnection";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";
import { throwErrorIfFalse } from "../../../utils/errors";
import checkOrderIsPayable from "./checkOrderIsPayable";

export default async function rejectPayment(
  orderId: string,
  reason: string,
): Promise<void> {
  const sanitizedReason = reason.trim();
  throwErrorIfFalse(sanitizedReason.length > 0, "O motivo é obrigatório");
  const isPayable = await checkOrderIsPayable(orderId);
  if (!isPayable) {
    throw new Error("Esse pedido não pode ser rejeitado");
  }
  const dataSource = await DatabaseConnection.getDataSource();
  const orderRepository = dataSource.getRepository(OrderUpdate);
  await orderRepository.save({
    order: {
      id: orderId,
    },
    status: OrderStatus.PAYMENT_REJECTED,
    observations: `Seu pagamento foi rejeitado, por favor, tente novamente. Motivo: ${sanitizedReason}`,
  });
}
