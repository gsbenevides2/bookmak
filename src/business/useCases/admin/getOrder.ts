import { Raw } from "typeorm";
import { DatabaseConnection } from "../../../persistence/dbConnection";
import { Order } from "../../models/Order";

export default async function getOrder(orderId: string): Promise<Order | null> {
  const dataSource = await DatabaseConnection.getDataSource();
  const orderRepository = dataSource.getRepository(Order);
  return await orderRepository.findOne({
    where: {
      id: orderId,
      updates: {
        id: Raw((alias) => `${alias} IS NOT NULL`),
      },
    },
    order: {
      updates: {
        timestamp: "DESC",
      },
    },
    relations: {
      updates: true,
      customer: true,
      items: {
        sku: {
          book: {
            authors: true,
          },
        },
      },
      billingAddress: true,
      shippingAddress: true,
      usedPaymentMethods: {
        card: true,
        coupon: true,
      },
    },
  });
}
