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

  const customersOk: CustomerTable[] = customers.map((data) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { address, customer, is_admin, is_ative } = data;
    const {
      dateOfBirth,
      phoneAreaCode,
      phoneNumber,
      phoneType,
      passwordHash,
      password,
      ...rest
    } = customer;
    return {
      ...rest,
      billing_address_id: address.id,
      date_of_birth: dateOfBirth,
      password_hash: passwordHash,
      delivery_address_id: address.id,
      is_active: is_ative ?? true,
      is_admin: is_admin ?? false,
      phone_area_code: phoneAreaCode,
      phone_number: phoneNumber,
      phone_type: phoneType,
    };
  });

  await knex<CustomerTable>("customer").insert(customersOk);
  await updateCustomerId(
    customers.map((data) => ({
      address_id: data.address.id,
      customer_id: data.customer.id,
    })),
  );
  await knex.destroy();
  return null;
}
