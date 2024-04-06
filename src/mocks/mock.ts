import { faker } from "@faker-js/faker";
import { Address } from "../models/Address";
import { Coupon } from "../models/Coupon";
import { Card } from "../models/Card";
import { Customer } from "../models/Customer";

interface CartItem {
  book: Book;
  subtotal: number;
  quantity: number;
}

interface Book {
  cover: string;
  title: string;
  author: string;
  description: string;
  price: number;
  id: string;
  category: string;
}

interface Category {
  id: number;
  name: string;
}

interface Author {
  id: number;
  name: string;
}

const categories: Category[] = [
  { id: 1, name: "Fantasia" },
  { id: 2, name: "Ficção Científica" },
  { id: 3, name: "Terror" },
  { id: 4, name: "Romance" },
  { id: 5, name: "Suspense" },
];

const authors: Author[] = [
  { id: 1, name: "Stephen King" },
  { id: 2, name: "J.K. Rowling" },
  { id: 3, name: "George R. R. Martin" },
  { id: 4, name: "Dan Brown" },
  { id: 5, name: "Agatha Christie" },
];
const books: Book[] = [];
const qtdFakerBooks = faker.number.int({
  min: 30,
  max: 50,
});

for (let i = 0; i < qtdFakerBooks; i++) {
  const category =
    categories[Math.floor(Math.random() * categories.length)].name;
  const author = authors[Math.floor(Math.random() * authors.length)].name;
  const id = faker.string.uuid();
  const price = faker.number.int({
    max: 10000,
    min: 100,
  });
  books.push({
    id,
    category,
    author,
    price,
    cover: faker.image.urlLoremFlickr({
      category: "book",
      width: 200,
      height: 300,
    }),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
  });
}

const qtdItensInCart = faker.number.int({
  min: 1,
  max: 5,
});

const cart: CartItem[] = [];

for (let i = 0; i < qtdItensInCart; i++) {
  const book = books[Math.floor(Math.random() * books.length)];
  const hasInCart = cart.find((item) => item.book.id === book.id);
  if (hasInCart != null) continue;
  const quantity = faker.number.int({
    min: 1,
    max: 5,
  });
  const subtotal = book.price * quantity;
  cart.push({
    book,
    quantity,
    subtotal,
  });
}

export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

export const orderStatusText = {
  [OrderStatus.PENDING]: "Pendente",
  [OrderStatus.PROCESSING]: "Processando",
  [OrderStatus.COMPLETED]: "Completado",
  [OrderStatus.CANCELED]: "Cancelado",
};

interface Order {
  id: string;
  status?: OrderStatus;
  addressShipping?: Address;
  addressPayment?: Address;
  bookmarkText?: string;
  bookmarkStyle?: string;
  coupons: Coupon[];
  shippingPrice?: number;
  subTotal?: number;
  totalPrice?: number;
  totalDiscount?: number;
  card?: Card;
  customer?: Customer;
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MockResponses {
  public static categories: Category[] = categories;
  public static authors: Author[] = authors;
  public static books: Book[] = books;
  public static cart: CartItem[] = [];

  public static order: Order = {
    id: faker.string.uuid(),
    coupons: [],
  };

  public static makedOrders: Order[] = [];
  public static bookmarkStyles: string[] = ["Estilo A", "Estilo 2", "Estilo C"];
  public static aiBookmarkTexts: string[] = [
    faker.lorem.sentence(),
    faker.lorem.sentence(),
    faker.lorem.sentence(),
    faker.lorem.sentence(),
  ];
}
