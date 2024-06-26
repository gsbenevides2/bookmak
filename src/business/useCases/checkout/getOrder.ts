import { Raw } from "typeorm";
import { DatabaseConnection } from "../../../persistence/dbConnection";
import { Order } from "../../models/Order";
import recalculateOrderTotal from "./recalculateOrderTotal";

export default async function getOrder(orderId: string): Promise<Order> {
  await recalculateOrderTotal(orderId);
  const datasource = await DatabaseConnection.getDataSource().catch(() => {
    throw new Error(
      "Ocorreu um erro interno ao buscar o pedido. Code: DataConnectionError",
    );
  });
  const orderRepository = datasource.getRepository(Order);
  const order = await orderRepository
    .findOne({
      where: {
        id: orderId,
        updates: {
          id: Raw((alias) => `${alias} IS NULL`),
        },
      },
      relations: {
        customer: true,
        items: {
          sku: {
            book: {
              authors: true,
            },
          },
        },
        updates: true,
        billingAddress: true,
        shippingAddress: true,
        usedPaymentMethods: {
          card: true,
          coupon: true,
        },
      },
    })
    .catch((error) => {
      console.error("OrderDbRequestError", error);
      throw new Error(
        "Ocorreu um erro interno ao buscar o pedido. Code: OrderDbRequestError",
      );
    });
  if (order == null) {
    throw new Error("Pedido não encontrado.");
  }
  return order;
}
