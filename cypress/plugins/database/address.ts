import { getConnection } from "./getConnnection";
/// <reference path="./typings.d.ts" />

export async function createAddress(
  addresses: DatabaseCreateAddressData[],
): Promise<null> {
  const knex = getConnection();
  await knex<AddressTable>("address").insert(
    addresses.map((data) => ({
      ...data.address,
      active: data.active ?? true,
      customerId: data.customerId,
    })),
  );
  await knex.destroy();
  return null;
}

export async function updateCustomerId(
  updates: DatabaseUpdateAddressData[],
): Promise<null> {
  const knex = getConnection();
  await Promise.all(
    updates.map((data) =>
      knex<AddressTable>("address")
        .where("id", data.addressId)
        .update({ customerId: data.customerId }),
    ),
  );
  await knex.destroy();
  return null;
}
