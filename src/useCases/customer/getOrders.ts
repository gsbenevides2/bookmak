import { DatabaseConnection } from "../../dbConnection";
import { Order } from "../../models/Order";

export async function getOrders(customerId: string) {
  const dataSource = await DatabaseConnection.getDataSource();
  const orderRepository = await dataSource.getRepository(Order);
  const orders = await orderRepository.find({
    where: {
      customer: { id: customerId },
    },
    relations: {
      updates: true,
    },
  });
  return orders;
}
