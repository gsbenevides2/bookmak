import { type BookSku } from "../../../../business/models/BookSku";

export function orderByName(skus: BookSku[]): BookSku[] {
  return skus.sort((a, b) =>
    a.title.localeCompare(b.title, "pt", {
      numeric: true,
      ignorePunctuation: true,
    }),
  );
}
