import { type Author } from "../../../../business/models/Author";

export function format(authors: Author[]): string {
  return authors.map((author) => author.name).join(", ");
}

export function order(authors: Author[]): Author[] {
  return authors.sort((a, b) => a.name.localeCompare(b.name));
}
