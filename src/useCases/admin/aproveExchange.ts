import { DatabaseConnection } from "../../dbConnection";
import { Coupon, CouponType } from "../../models/Coupon";
import { Order } from "../../models/Order";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";
import { throwErrorIfFalse } from "../../utils/errors";
import checkOrderIsExchangeable from "./checkOrderIsExchangeable";
import short from "short-uuid";

export default async function aproveExchange(orderId: string): Promise<void> {
  throwErrorIfFalse(
    await checkOrderIsExchangeable(orderId),
    "O pedido não pode ser trocado",
  );
  const datasource = await DatabaseConnection.getDataSource();

  await datasource.transaction(async (manager) => {
    const order = await manager.getRepository(Order).findOne({
      where: { id: orderId },
      relations: {
        customer: true,
        usedPaymentMethods: true,
      },
    });
    if (order == null) {
      throw new Error("Pedido não encontrado");
    }
    let value = order.usedPaymentMethods.reduce((acc, pm) => acc + pm.value, 0);

    if (order.totalPrice < 0) {
      value += order.totalPrice;
    }

    const couponCode = short.generate();
    await manager.getRepository(Coupon).save({
      attachedCustomer: order.customer,
      code: couponCode,
      type: CouponType.Exchange,
      used: false,
      value,
    });

    await manager.getRepository(OrderUpdate).save({
      order: {
        id: orderId,
      },
      observations:
        "Seu pedido de troca foi aprovado. Seu cupom de troca é: " + couponCode,
      status: OrderStatus.EXCHANGED,
    });
  });
}
