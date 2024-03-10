import { faker } from "@faker-js/faker";
import { type Controller } from "../types/controller";

export const getBooksController: Controller = (req, res) => {
  const qtdOfFakerBooks = 30;
  const filters = req.query;
  type Categories = Array<{
    id: number;
    name: string;
  }>;
  type Authors = Array<{
    id: number;
    name: string;
  }>;

  const categories: Categories = [
    { id: 1, name: "Romance" },
    { id: 2, name: "Ficção Científica" },
    { id: 3, name: "Terror" },
    { id: 4, name: "Ação" },
    { id: 5, name: "Aventura" },
  ];

  const authors: Authors = [
    { id: 1, name: "Stephen King" },
    { id: 2, name: "J.K. Rowling" },
    { id: 3, name: "George R. R. Martin" },
    { id: 4, name: "Dan Brown" },
    { id: 5, name: "Agatha Christie" },
  ];

  type Books = Array<{
    cover: string;
    title: string;
    author: string;
    description: string;
    price: string;
    id: number;
  }>;

  const books: Books = [];

  for (let i = 0; i < qtdOfFakerBooks; i++) {
    books.push({
      cover: faker.image.urlLoremFlickr({
        category: "book",
        width: 200,
        height: 300,
      }),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      author: authors[Math.floor(Math.random() * authors.length)].name,
      price: faker.commerce.price(),
      id: i,
    });
  }

  res.render("books", { books, filters, categories, authors });
};

export const getBookByIdController: Controller = (req, res) => {
  const { id } = req.params;
  const book = {
    cover: faker.image.urlLoremFlickr({
      category: "book",
      width: 200,
      height: 300,
    }),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price({
      symbol: "R$ ",
    }),
    id,
  };
  res.render("book", { book });
};
