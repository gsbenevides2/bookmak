import { Address } from "../models/Address";

export function maskCPF(cpf: string) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function maskDate(date: Date) {
  return date.toISOString().split("T")[0].split("-").reverse().join("/");
}

export function formatZipCode(zipCode: string) {
  return zipCode.replace(/(\d{5})(\d{3})/, "$1-$2");
}

export function maskAddresss(address: Address) {
  return `${address.street}, Nº${address.number}, CEP: ${formatZipCode(address.zipCode)}, ${address.district} ,${address.city} - ${address.state}`;
}
