import { getConnection } from "./getConnnection";
/// <reference path="./typings.d.ts" />

export async function createAddress(
  addresses: DatabaseCreateAddressData[],
): Promise<null> {
  const knex = getConnection();
  const addressesOk: AddressTable[] = addresses.map((address) => {
    console.log(address);
    const { houseType, streetType, zipCode, ...rest } = address.address;
    return {
      ...rest,
      house_type: houseType,
      street_type: streetType,
      zip_code: zipCode,
      active: address.active ?? true,
      customer_id: address.customer_id,
    };
  });
  await knex<AddressTable>("address").insert(addressesOk);
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
        .where("id", data.address_id)
        .update({ customer_id: data.customer_id }),
    ),
  );
  await knex.destroy();
  return null;
}
