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
