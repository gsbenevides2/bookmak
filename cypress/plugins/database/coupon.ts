/// <reference path="./typings.d.ts" />

import { getConnection } from "./getConnnection";

export async function createCoupon(
  data: DatabaseCreateCouponData,
): Promise<null> {
  const knex = getConnection();
  await knex<CouponTable>("coupon").insert({
    ...data.coupon,
    attachedCustomerId: data.attachedCustomerId,
    used: data.used,
  });
  await knex.destroy();
  return null;
}
