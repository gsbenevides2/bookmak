import { type Category } from "../../../../business/models/Category";

export function format(categories: Category[]): string {
  return categories.map((category) => category.name).join(", ");
}
