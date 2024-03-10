import { faker } from "@faker-js/faker";

interface CartItem {
  cartItemId: string;
  bookId: string;
  cover: string;
  title: string;
  quantity: number;
  unitPrice: string;
}

interface Book {
  cover: string;
  title: string;
  author: string;
  description: string;
  price: string;
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
  const id = faker.datatype.uuid();
  const price = faker.commerce.price({
    max: 100,
    min: 10,
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
  const quantity = faker.number.int({
    min: 1,
    max: 5,
  });
  const cartItemId = faker.datatype.uuid();
  cart.push({
    cartItemId,
    bookId: book.id,
    cover: book.cover,
    title: book.title,
    quantity,
    unitPrice: book.price,
  });
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MockResponses {
  public static categories: Category[] = categories;
  public static authors: Author[] = authors;
  public static books: Book[] = books;
  public static cart: CartItem[] = cart;
}
