import { In, Raw } from "typeorm";
import { DatabaseConnection } from "../../../persistence/dbConnection";
import { LastUpdates } from "../../../persistence/views/LastUpdates";
import { Order } from "../../models/Order";

interface Filters {
  orderId?: string;
  customerCPF?: string;
  status?: string;
}

export default async function getAllOrders(filters: Filters): Promise<Order[]> {
  const datasource = await DatabaseConnection.getDataSource();
  const ordersReponsitory = datasource.getRepository(Order);
  let initialFilteredOrders: string[] = [];

  if (filters.orderId != null && filters.orderId.length > 0) {
    initialFilteredOrders = [filters.orderId];
  }
  if (filters.status != null && filters.status.length > 0) {
    const lastUpdatesRepository = datasource.getRepository(LastUpdates);
    const lastUpdates = await lastUpdatesRepository.find({
      select: ["orderId"],
      where: {
        status: filters.status,
      },
    });
    if (lastUpdates.length === 0) {
      return [];
    }
    initialFilteredOrders = lastUpdates.map((update) => update.orderId);
  }

  const cpf =
    filters.customerCPF != null && filters.customerCPF.length > 0
      ? filters.customerCPF.replace(/\D/g, "")
      : undefined;

  const orders = await ordersReponsitory.find({
    relations: {
      updates: true,
      customer: true,
      items: {
        sku: true,
      },
    },
    where: {
      id:
        initialFilteredOrders.length > 0
          ? In(initialFilteredOrders)
          : undefined,
      updates: {
        id: Raw((alias) => `${alias} IS NOT NULL`),
      },
      customer: {
        cpf: cpf != null && cpf.length > 0 ? cpf : undefined,
      },
    },
    order: {
      updates: {
        timestamp: "DESC",
      },
    },
  });
  return orders;
}
