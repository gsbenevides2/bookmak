import { DatabaseConnection } from "../../../persistence/dbConnection";
import { Coupon, CouponType } from "../../models/Coupon";
import { Order } from "../../models/Order";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";
import { getRandomCouponCode } from "../../../utils/coupon";
import { throwErrorIfFalse } from "../../../utils/errors";
import checkOrderIsExchangeable from "./checkOrderIsExchangeable";

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
        items: true,
      },
    });
    if (order == null) {
      throw new Error("Pedido não encontrado");
    }

    const allItemsToChange = order.items.every((item) => item.inExchange);
    let couponValue = 0;
    if (allItemsToChange) {
      couponValue = order.usedPaymentMethods.reduce(
        (acc, pm) => acc + pm.value,
        0,
      );

      if (order.totalPrice < 0) {
        couponValue += order.totalPrice;
      }
    } else {
      couponValue = order.items.reduce((acc, item) => {
        if (item.inExchange ?? false) {
          return acc + item.unitSellPrice * item.quantity;
        }
        return acc;
      }, 0);
    }

    const couponCode = getRandomCouponCode();
    await manager.getRepository(Coupon).save({
      attachedCustomer: order.customer,
      code: couponCode,
      type: CouponType.Exchange,
      used: false,
      description: "Cupom de troca da compra " + order.id,
      value: couponValue,
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
