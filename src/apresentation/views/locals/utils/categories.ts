import { type Category } from "../../../../business/models/Category";

export function format(categories: Category[]): string {
  return categories.map((category) => category.name).join(", ");
}

export function order(categories: Category[]): Category[] {
  return categories.sort((a, b) => a.name.localeCompare(b.name));
}
