import {
  type Address,
  StreetType,
  streetTypesTexts,
  HouseType,
  houseTypesTexts,
} from "../../business/models/Address";
import { type Author } from "../../business/models/Author";
import { CardFlag, cardFlagText } from "../../business/models/Card";
import { type CouponType, couponsText } from "../../business/models/Coupon";
import {
  OrderStatus,
  orderStatusText,
  type OrderUpdate,
} from "../../business/models/OrderUpdate";

export function maskCPF(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function maskDate(date: Date): string {
  return date.toISOString().split("T")[0].split("-").reverse().join("/");
}

export function formatZipCode(zipCode: string): string {
  return zipCode.replace(/(\d{5})(\d{3})/, "$1-$2");
}

export function renderStreetType(streetType: StreetType): string {
  return streetTypesTexts[streetType];
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

export function maskAddresss(address: Address): string {
  const renderedStreetType = renderStreetType(address.streetType);
  return `${renderedStreetType} ${address.street}, Nº${address.number}, CEP: ${formatZipCode(address.zipCode)}, ${address.district} ,${address.city} - ${address.state}`;
}

export function formatPrice(price: number): string {
  const adaptativePrice = price / 100;
  return adaptativePrice.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
export const OrderStatusEnum = OrderStatus;

export function formatOrderStatus(status: OrderStatus): string {
  return orderStatusText[status];
}

export function getAvailableCardFlags(): Array<{
  value: CardFlag;
  text: string;
}> {
  return Object.values(CardFlag).map((value) => ({
    value,
    text: cardFlagText[value],
  }));
}

export function maxWords(text: string, max: number): string {
  const words = text.split(" ");
  if (words.length <= max) return text;
  return words.slice(0, max).join(" ") + "...";
}

export function formatAuthors(authors: Author[]): string {
  return authors.map((author) => author.name).join(", ");
}

export function orderUpdates(updates: OrderUpdate[]): OrderUpdate[] {
  return updates.sort((a, b) => {
    return b.timestamp.getTime() - a.timestamp.getTime();
  });
}

export function formatCardNumber(cardNumber: string): string {
  const lastFourDigits = cardNumber.slice(-4);
  return `****.****.****.${lastFourDigits}`;
}
export function formatCardFlag(cardFlag: CardFlag): string {
  return cardFlagText[cardFlag];
}

export function formatTimestamp(timestamp: Date): string {
  return timestamp.toLocaleString("pt-BR");
}

export function maskPhone(phone: string): string {
  return phone
    .replace(/\D/g, "")
    .slice(0, 9)
    .replace(/(\d{5})(\d{4})/, "$1-$2")
    .replace(/(\d{4})(\d{4})/, "$1-$2");
}

export function formatCouponTypeText(type: CouponType): string {
  return couponsText[type];
}
