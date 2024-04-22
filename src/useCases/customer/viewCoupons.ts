import { DatabaseConnection } from "../../dbConnection";
import { Coupon } from "../../models/Coupon";

export default async function viewCoupons(
  accountId: string,
): Promise<Coupon[]> {
  const dataSource = await DatabaseConnection.getDataSource();
  const couponsRepository = dataSource.getRepository(Coupon);
  const coupons = await couponsRepository.find({
    where: {
      attachedCustomer: {
        id: accountId,
      },
    },
    order: {
      createdAt: "DESC",
    },
  });

  return coupons;
}
