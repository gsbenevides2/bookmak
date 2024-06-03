export function maskCPF(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function maskPhone(phone: string): string {
  return phone
    .replace(/\D/g, "")
    .slice(0, 9)
    .replace(/(\d{5})(\d{4})/, "$1-$2")
    .replace(/(\d{4})(\d{4})/, "$1-$2");
}

export function formatCardNumber(cardNumber: string): string {
  const lastFourDigits = cardNumber.slice(-4);

  return `****.****.****.${lastFourDigits}`;
}
const createArray = (total: number, numero: number): number[] =>
  Array.from(Array(total), () => numberRandom(numero));

const numberRandom = (number: number): number =>
  Math.round(Math.random() * number);
const mod = (dividendo: number, divisor: number): number =>
  Math.round(dividendo - Math.floor(dividendo / divisor) * divisor);

export function generateCPF(mascara: boolean): string {
  const totalArray = 9;
  const n = 9;
  const [n1, n2, n3, n4, n5, n6, n7, n8, n9] = createArray(totalArray, n);

  let d1 =
    n9 * 2 +
    n8 * 3 +
    n7 * 4 +
    n6 * 5 +
    n5 * 6 +
    n4 * 7 +
    n3 * 8 +
    n2 * 9 +
    n1 * 10;
  d1 = 11 - mod(d1, 11);
  if (d1 >= 10) d1 = 0;

  let d2 =
    d1 * 2 +
    n9 * 3 +
    n8 * 4 +
    n7 * 5 +
    n6 * 6 +
    n5 * 7 +
    n4 * 8 +
    n3 * 9 +
    n2 * 10 +
    n1 * 11;
  d2 = 11 - mod(d2, 11);
  if (d2 >= 10) d2 = 0;

  if (mascara)
    return `${n1}${n2}${n3}.${n4}${n5}${n6}.${n7}${n8}${n9}-${d1}${d2}`;
  else return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${d1}${d2}`;
}

export function parseDateStr(dateStr: string): Date {
  return new Date(dateStr);
}

export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function parseHouseType(houseType: string): string {
  const houseTypeMap: Record<string, string> = {
    house: "Casa",
  };
  return houseTypeMap[houseType];
}

export function parseStreetType(streetType: string): string {
  const streetTypeMap: Record<string, string> = {
    street: "Rua",
  };
  return streetTypeMap[streetType];
}

export function maskZipCode(zipCode: string): string {
  return zipCode.replace(/(\d{5})(\d{3})/, "$1-$2");
}

export function parseCardFlag(cardFlag: string): string {
  const cardFlagMap: Record<string, string> = {
    visa: "Visa",
    mastercard: "MasterCard",
  };
  return cardFlagMap[cardFlag];
}

export function getRandomItemFromArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function getRandomWordInText(text: string): string {
  const words = text.split(" ");
  return getRandomItemFromArray(words);
}

export function getRandomFisrtWordInText(
  text: string,
  firtNWords: number,
  minWordSize?: number,
): string {
  let words = text.split(" ");
  if (minWordSize != null)
    words = words.filter((word) => word.length >= minWordSize);
  return getRandomItemFromArray(words.slice(0, firtNWords));
}

export function formatMoney(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function getFirstWords(text: string, n: number): string {
  return text.split(" ").slice(0, n).join(" ");
}

export function formatCardFlag(cardFlag: string): string {
  const cardFlagMap: Record<string, string> = {
    visa: "Visa",
    mastercard: "MasterCard",
  };
  return cardFlagMap[cardFlag];
}
