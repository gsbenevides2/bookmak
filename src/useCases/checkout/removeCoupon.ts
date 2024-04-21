import { Raw } from "typeorm";
import { DatabaseConnection } from "../../dbConnection";
import { Order } from "../../models/Order";
import { OrderPaymentMethod } from "../../models/OrderPaymentMethod";
import recalculateOrderTotal from "./recalculateOrderTotal";

export default async function removeCoupon(
  orderId: string,
  couponCode: string,
): Promise<void> {
  const datasource = await DatabaseConnection.getDataSource();
  await datasource.transaction(async (manager) => {
    const orderRepository = manager.getRepository(Order);
    const paymentMethodRepository = manager.getRepository(OrderPaymentMethod);

    const order = await orderRepository.findOne({
      where: {
        id: orderId,
        updates: {
          id: Raw((alias) => `${alias} IS NULL`),
        },
      },
    });
    if (order == null) {
      throw new Error("Pedido não encontrado");
    }

    const orderPaymentMethod = await paymentMethodRepository.findOne({
      where: { coupon: { code: couponCode }, order },
      relations: {
        coupon: true,
        order: true,
      },
    });

    if (orderPaymentMethod == null) {
      throw new Error("Cupom não encontrado");
    }

    await paymentMethodRepository.remove(orderPaymentMethod);

    order.discounts -= orderPaymentMethod.value;
    await orderRepository.save(order);
  });
  await recalculateOrderTotal(orderId);
}
