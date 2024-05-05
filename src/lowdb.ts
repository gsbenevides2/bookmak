import fs from "fs";
export interface Volume {
  id: string;
  number: number;
  cover: string;
  price: number;
  stockQuantity: number;
}
export interface Book {
  id: string;
  title: string;
  cover: string;
  description: string;
  translatedDescription?: string;
  authors: Author[];
  categories: Category[];
  volumes: Volume[];
  bookmarkStyle?: string;
}
export interface Author {
  id: string;
  name: string;
}
export interface Category {
  id: string;
  name: string;
  translatedName?: string;
}

export interface Db {
  books: Book[];
}

export default class LowDb {
  loaded = false;
  data: Db = { books: [] };
  private static readonly instance: LowDb = new LowDb();
  private constructor() {}

  static getInstance(): LowDb {
    if (!this.instance.loaded) {
      this.instance.openDb();
    }
    return this.instance;
  }

  private openDb(): void {
    const exists = fs.existsSync("db.json");
    if (!exists) {
      fs.writeFileSync("db.json", JSON.stringify({ books: [] }));
    }
    const buffer = fs.readFileSync("db.json");
    this.data = JSON.parse(buffer.toString());
    this.loaded = true;
  }

  addBook(book: Book): void {
    const { books } = this.data;
    const bookExists = books.find((b) => b.id === book.id);
    if (bookExists != null) {
      return;
    }
    books.push(book);
    this.data.books = books;
    this.write();
  }

  bookExists(id: string): boolean {
    const { books } = this.data;
    return books.some((book) => book.id === id);
  }

  bookUpdate(book: Book): void {
    const { books } = this.data;
    const bookIndex = books.findIndex((b) => b.id === book.id);
    if (bookIndex === -1) {
      return;
    }
    books[bookIndex] = book;
    this.data.books = books;
    this.write();
  }

  fethAllCategories(): Category[] {
    const categories: Category[] = [];
    this.data.books.forEach((book) => {
      book.categories.forEach((category) => {
        const categoryExists = categories.find((c) => c.id === category.id);
        if (categoryExists == null) {
          categories.push(category);
        }
      });
    });
    return categories;
  }

  fetchAllAuthors(): Author[] {
    const authors: Author[] = [];
    this.data.books.forEach((book) => {
      book.authors.forEach((author) => {
        const authorExists = authors.find((a) => a.id === author.id);
        if (authorExists == null) {
          authors.push(author);
        }
      });
    });
    return authors;
  }

  fetchAllBooks(): Book[] {
    return this.data.books;
  }

  private write(): void {
    fs.writeFileSync("db.json", JSON.stringify(this.data));
  }
}
