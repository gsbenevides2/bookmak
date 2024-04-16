import { Raw } from "typeorm";
import { DatabaseConnection } from "../../dbConnection";
import { Order } from "../../models/Order";

export async function getAllOrders(): Promise<Order[]> {
  const datasource = await DatabaseConnection.getDataSource();
  const ordersReponsitory = datasource.getRepository(Order);
  const orders = await ordersReponsitory.find({
    relations: {
      updates: true,
    },
    where: {
      updates: {
        id: Raw((alias) => `${alias} IS NOT NULL`),
      },
    },
  });
  return orders;
}
