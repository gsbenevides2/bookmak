import { DatabaseConnection } from "../../dbConnection";
import { Customer } from "../../models/Customer";

interface GetAddressesResponse {
  id: string;
  addressName: string;
  residenceType: string;
  streetType: string;
  street: string;
  number: string;
  district: string;
  zip: string;
  city: string;
  state: string;
  country: string;
  observations: string | undefined;
}

interface AddressSettings {
  billingAddress: GetAddressesResponse;
  deliveryAddress: GetAddressesResponse;
}

export default async function getCustomerAddressSettings(
  customerId: string,
): Promise<AddressSettings> {
  const dataSource = await DatabaseConnection.getDataSource();
  const customerRepository = dataSource.getRepository(Customer);
  const addressSettings = await customerRepository.findOne({
    where: { id: customerId },
    relations: ["billingAddress", "deliveryAddress"],
  });

  if (addressSettings == null) {
    throw new Error("Cliente não encontrado");
  }

  return {
    billingAddress: {
      id: addressSettings.billingAddress.id,
      addressName: addressSettings.billingAddress.nickname,
      residenceType: addressSettings.billingAddress.houseType,
      streetType: addressSettings.billingAddress.streetType,
      street: addressSettings.billingAddress.street,
      number: addressSettings.billingAddress.number,
      district: addressSettings.billingAddress.district,
      zip: addressSettings.billingAddress.zipCode,
      city: addressSettings.billingAddress.city,
      state: addressSettings.billingAddress.state,
      country: addressSettings.billingAddress.country,
      observations: addressSettings.billingAddress.observations,
    },
    deliveryAddress: {
      id: addressSettings.deliveryAddress.id,
      addressName: addressSettings.deliveryAddress.nickname,
      residenceType: addressSettings.deliveryAddress.houseType,
      streetType: addressSettings.deliveryAddress.streetType,
      street: addressSettings.deliveryAddress.street,
      number: addressSettings.deliveryAddress.number,
      district: addressSettings.deliveryAddress.district,
      zip: addressSettings.deliveryAddress.zipCode,
      city: addressSettings.deliveryAddress.city,
      state: addressSettings.deliveryAddress.state,
      country: addressSettings.deliveryAddress.country,
      observations: addressSettings.deliveryAddress.observations,
    },
  };
}
