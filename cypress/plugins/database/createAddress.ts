import { type AddressTable } from "../../typings/databaseTables";
import { type AddressFixtureData } from "../../typings/fixures";
import { getConnection } from "./getConnnection";

interface CreateDatabaseAddressData {
  addressData: AddressFixtureData;
  customerId: string;
}
export async function createAddress(
  params: CreateDatabaseAddressData,
): Promise<string> {
  const knex = getConnection();
  const [{ id: addressId }] = await knex<AddressTable>("address")
    .insert({
      nickname: params.addressData.nickname,
      street: params.addressData.street,
      houseType: params.addressData.houseType,
      streetType: params.addressData.streetType,
      number: params.addressData.number,
      district: params.addressData.district,
      zipCode: params.addressData.zipCode,
      city: params.addressData.city,
      state: params.addressData.state,
      country: params.addressData.country,
      observations: params.addressData.observations,
      customerId: params.customerId,
      active: params.addressData.active,
    })
    .returning("id");
  await knex.destroy();
  return addressId;
}
