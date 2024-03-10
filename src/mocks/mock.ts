import { faker } from "@faker-js/faker";

interface CartItem {
  book: Book;
  subtotal: string;
  quantity: number;
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
  const id = faker.string.uuid();
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
  const hasInCart = cart.find((item) => item.book.id === book.id);
  if (hasInCart != null) continue;
  const quantity = faker.number.int({
    min: 1,
    max: 5,
  });
  const subtotal = (parseFloat(book.price) * quantity).toFixed(2);
  cart.push({
    book,
    quantity,
    subtotal,
  });
}

interface Order {
  address?: Address;
  bookmarkText?: string;
  bookmarkStyle?: string;
}

interface Account {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  birthdate: Date;
  isAdmin: boolean;
}

const accounts: Account[] = [
  {
    id: faker.string.uuid(),
    name: "Guilherme da Silva Benevides",
    email: "gsbenevides2@gmail.com",
    password: "123456789",
    cpf: "12345678901",
    birthdate: new Date("1998-08-25"),
    isAdmin: true,
  },
  {
    id: faker.string.uuid(),
    name: "João da Silva",
    email: "joaoSilva@gmail.com",
    password: "123456789",
    cpf: "12345678902",
    birthdate: new Date("1998-08-25"),
    isAdmin: false,
  },
];

interface Address {
  id: string;
  nickname: string;
  typeOfResidence: string;
  typeOfStreat: string;
  streat: string;
  number: string;
  district: string;
  code: string;
  city: string;
  state: string;
  country: string;
  observation?: string;
}

const addresses: Address[] = [
  {
    id: faker.string.uuid(),
    nickname: "Casa",
    typeOfResidence: "Casa",
    typeOfStreat: "Rua",
    streat: "Rua das Flores",
    number: "123",
    district: "Centro",
    code: "12345678",
    city: "São Paulo",
    state: "SP",
    country: "Brasil",
  },
  {
    id: faker.string.uuid(),
    nickname: "Apartamento",
    typeOfResidence: "Apartamento",
    typeOfStreat: "Avenida",
    streat: "Avenida Paulista",
    number: "123",
    district: "Centro",
    code: "12345678",
    city: "São Paulo",
    state: "SP",
    country: "Brasil",
  },
];

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MockResponses {
  public static categories: Category[] = categories;
  public static authors: Author[] = authors;
  public static books: Book[] = books;
  public static cart: CartItem[] = cart;
  public static get total(): string {
    return cart
      .reduce((acc, item) => {
        return acc + parseFloat(item.subtotal);
      }, 0)
      .toFixed(2);
  }

  public static order: Order = {};
  public static bookmarkStyles: string[] = ["Estilo A", "Estilo 2", "Estilo C"];
  public static aiBookmarkTexts: string[] = [
    faker.lorem.sentence(),
    faker.lorem.sentence(),
    faker.lorem.sentence(),
    faker.lorem.sentence(),
  ];

  public static accounts: Account[] = accounts;
  public static addresses: Address[] = addresses;
}
