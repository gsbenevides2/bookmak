import { Raw } from "typeorm";
import { DatabaseConnection } from "../../dbConnection";
import { Order } from "../../models/Order";

export default async function getOrder(orderId: string) {
  const dataSource = await DatabaseConnection.getDataSource();
  const orderRepository = await dataSource.getRepository(Order);
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
      },
    },
  });
}
