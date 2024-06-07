/// <reference path="./typings.d.ts" />

import { getConnection } from "./getConnnection";

export async function createCoupon(
  data: DatabaseCreateCouponData,
): Promise<null> {
  const knex = getConnection();
  await knex<CouponTable>("coupon").insert({
    ...data.coupon,
    attached_customer_id: data.attached_customer_id,
    used: data.used,
  });
  await knex.destroy();
  return null;
}
