import short from "short-uuid";

export function getRandomCouponCode(): string {
  return short.generate();
}
