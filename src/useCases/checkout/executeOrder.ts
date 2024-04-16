import { DatabaseConnection } from "../../dbConnection";
import { Card } from "../../models/Card";
import { Order } from "../../models/Order";
import { OrderPaymentMethod } from "../../models/OrderPaymentMethod";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";

interface Params {
  cardId: string;
  orderId: string;
  customerId: string;
}
export async function executeOrder(params: Params) {
  const { cardId, orderId, customerId } = params;
  const datasource = await DatabaseConnection.getDataSource();
  const orderRepository = await datasource.getRepository(Order);
  const cardsRepository = await datasource.getRepository(Card);
  const orderPaymentMethodRepository =
    await datasource.getRepository(OrderPaymentMethod);
  const orderUpdateRepository = await datasource.getRepository(OrderUpdate);
  const order = await orderRepository.findOne({
    where: { id: orderId, customer: { id: customerId } },
    relations: ["customer"],
  });
  if (order == null) {
    throw new Error("Pedido não encontrado");
  }
  const card = await cardsRepository.findOne({
    where: { id: cardId, customer: { id: customerId } },
    relations: ["customer"],
  });

  if (card === null) {
    throw new Error("Cartão não encontrado");
  }
  const orderPaymentMethod = new OrderPaymentMethod();
  orderPaymentMethod.card = card;
  orderPaymentMethod.value = order.totalPrice;
  orderPaymentMethod.order = order;
  const orderUpdate = new OrderUpdate();
  orderUpdate.status = OrderStatus.PROCESSING;
  orderUpdate.observations = `Estamos recebendo seu pagamento. Aguarde!`;
  orderUpdate.order = order;
  await orderUpdateRepository.save(orderUpdate);
  await orderPaymentMethodRepository.save(orderPaymentMethod);
}