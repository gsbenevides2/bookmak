import { createAddress, updateCustomerId } from "./address";
import { getConnection } from "./getConnnection";

/// <reference path="./typings.d.ts" />

export async function createCustomer(
  customers: DatabaseCreateCustomerData[],
): Promise<null> {
  const knex = getConnection();
  await createAddress(
    customers.map((data) => ({
      address: data.address,
    })),
  );
  await knex<CustomerTable>("customer").insert(
    customers.map((data) => ({
      ...data.customer,
      billingAddressId: data.address.id,
      deliveryAddressId: data.address.id,
      isActive: data.isActive ?? true,
      isAdmin: data.isAdmin ?? false,
    })),
  );
  await updateCustomerId(
    customers.map((data) => ({
      customerId: data.customer.id,
      addressId: data.address.id,
    })),
  );
  await knex.destroy();
  return null;
}
