import { DatabaseConnection } from "../../../persistence/dbConnection";
import { getRandomCouponCode } from "../../../utils/coupon";
import { throwErrorIfFalse } from "../../../utils/errors";
import { Coupon, CouponType } from "../../models/Coupon";
import { Order } from "../../models/Order";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";
import checkOrderIsCancelable from "./checkOrderIsCancelable";

export default async function cancelOrder(orderId: string): Promise<void> {
  throwErrorIfFalse(
    await checkOrderIsCancelable(orderId),
    "O pedido não pode ser cancelado",
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

    let couponValue = 0;

    couponValue = order.usedPaymentMethods.reduce(
      (acc, pm) => acc + pm.value,
      0,
    );

    if (order.totalPrice < 0) {
      couponValue += order.totalPrice;
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
        "Seu pedido foi cancelado. Seu cupom de troca é: " + couponCode,
      status: OrderStatus.CANCELED,
    });
  });
}
