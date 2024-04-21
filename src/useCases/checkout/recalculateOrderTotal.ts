import { DatabaseConnection } from "../../dbConnection";
import { Order } from "../../models/Order";

export default async function recalculateOrderTotal(
  orderId: string,
): Promise<void> {
  const datasource = await DatabaseConnection.getDataSource();

  const orderRepository = datasource.getRepository(Order);

  const order = await orderRepository.findOne({
    where: { id: orderId },
    relations: [
      "items",
      "items.sku",
      "usedPaymentMethods",
      "usedPaymentMethods.coupon",
    ],
  });

  if (order === null) {
    throw new Error("Order not found");
  }

  const newItems = order.items.map((item) => {
    return {
      ...item,
      unitSellPrice: item.sku.price,
    };
  });

  const discounts = order.usedPaymentMethods.reduce((acc, paymentMethod) => {
    return acc + (paymentMethod.coupon?.value ?? 0);
  }, 0);

  order.items = newItems;

  const subtotal = order.items.reduce((acc, item) => {
    return acc + item.unitSellPrice * item.quantity;
  }, 0);

  order.discounts = discounts;
  order.subtotal = subtotal;
  order.totalPrice = subtotal - discounts + order.shippingPrice;

  await orderRepository.save(order);
}
