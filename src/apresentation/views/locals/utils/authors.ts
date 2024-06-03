import { type Author } from "../../../../business/models/Author";

export function format(authors: Author[]): string {
  return authors.map((author) => author.name).join(", ");
}
