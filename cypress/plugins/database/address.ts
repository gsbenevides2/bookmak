import { getConnection } from "./getConnnection";
/// <reference path="./typings.d.ts" />

export async function createAddress(
  addresses: DatabaseCreateAddressData[],
): Promise<null> {
  const knex = getConnection();
  const addressesOk: AddressTable[] = addresses.map((address) => {
    const { houseType, streetType, zipCode, shippingTableInfo, ...rest } =
      address.address;
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
  await knex<ShippingRateTemplateTable>("shipping_rate_template")
    .insert(
      addresses.map((address) => ({
        absolute_money_cost:
          address.address.shippingTableInfo.absoluteMoneyCost,
        id: address.address.shippingTableInfo.id,
        price_by_weight: address.address.shippingTableInfo.priceByWeight,
        price_percentage: address.address.shippingTableInfo.pricePercentage,
        weight_end: address.address.shippingTableInfo.weightEnd,
        weight_start: address.address.shippingTableInfo.weightStart,
        zip_code_end: address.address.shippingTableInfo.zipCodeEnd,
        zip_code_start: address.address.shippingTableInfo.zipCodeStart,
      })),
    )
    .onConflict("id")
    .ignore();
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
