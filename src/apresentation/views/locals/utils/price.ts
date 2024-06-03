export function format(price: number): string {
  const adaptativePrice = price / 100;
  return adaptativePrice.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
