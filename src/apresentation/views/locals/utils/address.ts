import type { Address } from "../../../../business/models/Address";
import {
  HouseType,
  StreetType,
  houseTypesTexts,
  streetTypesTexts,
} from "../../../../business/models/Address";

export function formatZipCode(zipCode: string): string {
  return zipCode.replace(/(\d{5})(\d{3})/, "$1-$2");
}

export function renderStreetType(streetType: StreetType): string {
  return streetTypesTexts[streetType];
}

export function mask(address: Address): string {
  const renderedStreetType = renderStreetType(address.streetType);
  return `${renderedStreetType} ${address.street}, Nº${address.number}, CEP: ${formatZipCode(address.zipCode)}, ${address.district} ,${address.city} - ${address.state}`;
}

export function renderHouseType(houseType: HouseType): string {
  return houseTypesTexts[houseType];
}

export function getAvailableHouseTypes(): Array<{
  value: HouseType;
  text: string;
}> {
  return Object.values(HouseType).map((value) => ({
    value,
    text: houseTypesTexts[value],
  }));
}

export function getAvailableStreetTypes(): Array<{
  value: StreetType;
  text: string;
}> {
  return Object.values(StreetType).map((value) => ({
    value,
    text: streetTypesTexts[value],
  }));
}
