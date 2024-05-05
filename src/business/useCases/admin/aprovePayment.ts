import { DatabaseConnection } from "../../../persistence/dbConnection";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";
import checkOrderIsPayable from "./checkOrderIsPayable";

export default async function aprovePayment(orderId: string): Promise<void> {
  const isPayable = await checkOrderIsPayable(orderId);
  if (!isPayable) {
    throw new Error("Esse pedido não pode ser aprovado");
  }
  const dataSource = await DatabaseConnection.getDataSource();
  const orderRepository = dataSource.getRepository(OrderUpdate);
  await orderRepository.save({
    order: {
      id: orderId,
    },
    status: OrderStatus.PAYMENT_APPROVED,
    observations: `Seu pagamento foi aprovado, aguarde que logo o pedido será enviado.`,
  });
}
