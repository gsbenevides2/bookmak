import { DatabaseConnection } from "../../dbConnection";
import { Order } from "../../models/Order";

export async function recalculateOrderTotal(orderId: string) {
  const datasource = await DatabaseConnection.getDataSource();

  const orderRepository = await datasource.getRepository(Order);

  const order = await orderRepository.findOne({
    where: { id: orderId },
    relations: ["items"],
  });

  if (order === null) {
    throw new Error("Order not found");
  }

  const subtotal = order.items.reduce((acc, item) => {
    return acc + item.unitSellPrice * item.quantity;
  }, 0);

  order.subtotal = subtotal;
  order.totalPrice = subtotal - order.discounts + order.shippingPrice;
  await orderRepository.save(order);
}
