import { DatabaseConnection } from "../../../persistence/dbConnection";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";
import { throwErrorIfFalse } from "../../../utils/errors";
import checkOrderIsExchangeable from "./checkOrderIsExchangeable";

export default async function rejectExchange(
  orderId: string,
  reason: string,
): Promise<void> {
  const sanitizedReason = reason.trim();

  throwErrorIfFalse(
    sanitizedReason.length > 0,
    "O motivo da rejeição é obrigatório",
  );

  throwErrorIfFalse(
    await checkOrderIsExchangeable(orderId),
    "O pedido não está em processo de troca",
  );
  await (await DatabaseConnection.getDataSource())
    .getRepository(OrderUpdate)
    .save({
      order: {
        id: orderId,
      },
      observations: `Seu pedido de troca foi rejeitado, motivo: ${sanitizedReason}. O produto será reenviado para o endereço de entrega.`,
      status: OrderStatus.EXCHANGE_REJECTED,
    });
}
