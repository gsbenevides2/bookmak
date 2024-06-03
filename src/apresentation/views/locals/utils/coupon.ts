import type { CouponType } from "../../../../business/models/Coupon";
import { couponsText } from "../../../../business/models/Coupon";

export function formatTypeText(type: CouponType): string {
  return couponsText[type];
}
