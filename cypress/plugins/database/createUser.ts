import {
  type AddressTable,
  type CustomerTable,
} from "../../typings/databaseTables";
import {
  type AddressFixtureData,
  type UserFixtureData,
} from "../../typings/fixtures";
import { getConnection } from "./getConnnection";

export interface CreateDatabaseUserData {
  userData: UserFixtureData;
  addressData: AddressFixtureData;
}

export interface CreateUserResponse {
  userId: string;
  addressId: string;
}

export async function createUser(
  params: CreateDatabaseUserData,
): Promise<CreateUserResponse> {
  const knex = getConnection();
  const a: CreateUserResponse = {
    userId: "",
    addressId: "",
  };

  await knex.transaction(async (trx) => {
    const [{ id: addressId }] = await trx<AddressTable>("address")
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
        active: params.addressData.active,
      })
      .returning("id");

    const [{ id: userId }] = await trx<CustomerTable>("customer")
      .insert({
        isAdmin: params.userData.isAdmin,
        name: params.userData.name,
        email: params.userData.email,
        cpf: params.userData.cpf,
        password: params.userData.password,
        phoneType: params.userData.phoneType,
        phoneNumber: params.userData.phoneNumber,
        phoneAreaCode: params.userData.phoneAreaCode,
        dateOfBirth: params.userData.dateOfBirth,
        deliveryAddressId: addressId,
        billingAddressId: addressId,
        isActive: params.userData.active,
        gender: params.userData.gender,
      })
      .returning("id");

    await trx("address")
      .update({
        customerId: userId,
      })
      .where("id", addressId);
    await trx.commit();

    a.userId = userId;
    a.addressId = addressId;
  });
  await knex.destroy();
  return a;
}
