import { DatabaseConnection } from "../../../persistence/dbConnection";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";
import { throwErrorIfFalse } from "../../../utils/errors";
import checkOrderIsCancelable from "./checkOrderIsCancelable";

export default async function rejectCancel(
  orderId: string,
  reason: string,
): Promise<void> {
  const sanitizedReason = reason.trim();

  throwErrorIfFalse(
    sanitizedReason.length > 0,
    "O motivo da rejeição é obrigatório",
  );

  throwErrorIfFalse(
    await checkOrderIsCancelable(orderId),
    "O pedido não está em processo de cancelamento",
  );
  await (await DatabaseConnection.getDataSource())
    .getRepository(OrderUpdate)
    .save({
      order: {
        id: orderId,
      },
      observations: `Seu pedido de cancelamento foi rejeitado, motivo: ${sanitizedReason}. O produto será reenviado para o endereço de entrega.`,
      status: OrderStatus.CANCEL_REJECTED,
    });
}
