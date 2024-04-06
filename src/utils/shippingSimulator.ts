import { faker } from "@faker-js/faker";

export function shippingSimulator() {
  return faker.number.int({
    max: 2000,
    min: 1000,
  });
}
