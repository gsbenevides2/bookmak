import { Raw } from "typeorm";
import { DatabaseConnection } from "../../dbConnection";
import { Order } from "../../models/Order";

export default async function getOrders(customerId: string): Promise<Order[]> {
  const dataSource = await DatabaseConnection.getDataSource();
  const orderRepository = dataSource.getRepository(Order);
  const orders = await orderRepository.find({
    where: {
      customer: { id: customerId },
      updates: {
        id: Raw((alias) => `${alias} IS NOT NULL`),
      },
    },
    relations: {
      updates: true,
    },
  });
  return orders;
}
