import { OrderStatus, orderStatusText } from "../mocks/mock";
import {
  Address,
  StreetType,
  streetTypesTexts,
  HouseType,
  houseTypesTexts,
} from "../models/Address";
import { Author } from "../models/Author";
import { CardFlag, cardFlagText } from "../models/Card";
import { OrderUpdate } from "../models/OrderUpdate";

export function maskCPF(cpf: string) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function maskDate(date: Date) {
  return date.toISOString().split("T")[0].split("-").reverse().join("/");
}

export function formatZipCode(zipCode: string) {
  return zipCode.replace(/(\d{5})(\d{3})/, "$1-$2");
}

export function renderStreetType(streetType: StreetType) {
  return streetTypesTexts[streetType];
}

export function getAvailableStreetTypes() {
  return Object.values(StreetType).map((value) => ({
    value,
    text: streetTypesTexts[value],
  }));
}

export function renderHouseType(houseType: HouseType) {
  return houseTypesTexts[houseType];
}

export function getAvailableHouseTypes() {
  return Object.values(HouseType).map((value) => ({
    value,
    text: houseTypesTexts[value],
  }));
}

export function maskAddresss(address: Address) {
  const renderedStreetType = renderStreetType(address.streetType);
  return `${renderedStreetType} ${address.street}, Nº${address.number}, CEP: ${formatZipCode(address.zipCode)}, ${address.district} ,${address.city} - ${address.state}`;
}

export function formatPrice(price: number) {
  const adaptativePrice = price / 100;
  return adaptativePrice.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
export const OrderStatusEnum = OrderStatus;

export function formatOrderStatus(status: OrderStatus) {
  return orderStatusText[status];
}

export function getAvailableCardFlags() {
  return Object.values(CardFlag).map((value) => ({
    value,
    text: cardFlagText[value],
  }));
}

export function maxWords(text: string, max: number) {
  const words = text.split(" ");
  if (words.length <= max) return text;
  return words.slice(0, max).join(" ") + "...";
}

export function formatAuthors(authors: Author[]) {
  return authors.map((author) => author.name).join(", ");
}

export function orderUpdates(updates: OrderUpdate[]) {
  return updates.sort((a, b) => {
    return a.timestamp.getTime() - b.timestamp.getTime();
  });
}

export function formatCardNumber(cardNumber: string) {
  return `**** **** **** ${cardNumber.slice(-4)}`;
}
export function formatCardFlag(cardFlag: CardFlag) {
  return cardFlagText[cardFlag];
}

export function formatTimestamp(timestamp: Date) {
  return timestamp.toLocaleString("pt-BR");
}

export function maskPhone(phone: string) {
  return phone
    .replace(/\D/g, "")
    .slice(0, 9)
    .replace(/(\d{5})(\d{4})/, "$1-$2")
    .replace(/(\d{4})(\d{4})/, "$1-$2");
}
