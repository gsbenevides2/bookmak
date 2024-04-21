import { Raw } from "typeorm";
import { DatabaseConnection } from "../../dbConnection";
import { Coupon } from "../../models/Coupon";
import { Order } from "../../models/Order";
import { OrderPaymentMethod } from "../../models/OrderPaymentMethod";
import recalculateOrderTotal from "./recalculateOrderTotal";
import { throwErrorIfFalse } from "../../utils/errors";

interface Params {
  code: string;
  accountId: string;
  orderId: string;
}

export default async function addCoupon(params: Params): Promise<void> {
  const { code, accountId, orderId } = params;
  const datasource = await DatabaseConnection.getDataSource();
  await datasource.transaction(async (manager) => {
    const orderRepository = manager.getRepository(Order);
    const couponRepository = manager.getRepository(Coupon);
    const paymentMethodRepository = manager.getRepository(OrderPaymentMethod);

    const order = await orderRepository.findOne({
      where: {
        id: orderId,
        customer: { id: accountId },
        updates: {
          id: Raw((alias) => `${alias} IS NULL`),
        },
      },
    });
    if (order == null) {
      throw new Error("Pedido não encontrado");
    }

    const usedCoupon = await paymentMethodRepository.findOne({
      where: { order: { id: orderId }, coupon: { code } },
    });

    console.log("usedCoupon", usedCoupon);
    throwErrorIfFalse(usedCoupon === null, "Cupon já utilizado");

    const coupon = await couponRepository.findOne({
      where: { code },
      relations: {
        attachedCustomer: true,
      },
    });

    if (coupon == null) {
      throw new Error("Cupom não encontrado");
    }

    if (coupon.used) {
      throw new Error("Cupom já utilizado");
    }

    if (
      coupon.attachedCustomer != null &&
      coupon.attachedCustomer.id !== accountId
    ) {
      throw new Error("Cupom não pertence ao cliente");
    }

    await paymentMethodRepository.save({
      coupon,
      order,
      value: coupon.value,
    });
  });
  await recalculateOrderTotal(orderId);
}
