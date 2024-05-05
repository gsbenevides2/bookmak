import { DatabaseConnection } from "../../../persistence/dbConnection";
import { Coupon } from "../../models/Coupon";

export default async function listCoupons(): Promise<Coupon[]> {
  const datasource = await DatabaseConnection.getDataSource();
  const couponRepository = datasource.getRepository(Coupon);
  const coupons = await couponRepository.find({
    relations: {
      attachedCustomer: true,
    },
    order: {
      createdAt: "DESC",
    },
  });
  return coupons;
}
