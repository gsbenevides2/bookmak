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
interface ImageNewUrl {
  newUrl: string;
  oldUrl: string;
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

  findBookById(id: string): Book | undefined {
    return this.data.books.find((book) => book.id === id);
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

  listAllImagesUrls(): string[] {
    const urls: string[] = [];
    this.data.books.forEach((book) => {
      urls.push(book.cover);
      book.volumes.forEach((volume) => {
        urls.push(volume.cover);
      });
    });
    return urls;
  }

  updateImagesUrls(images: ImageNewUrl[]): void {
    const { books } = this.data;
    images.forEach((image) => {
      books.forEach((book) => {
        if (book.cover === image.oldUrl) {
          book.cover = image.newUrl;
        }
        book.volumes.forEach((volume) => {
          if (volume.cover === image.oldUrl) {
            volume.cover = image.newUrl;
          }
        });
      });
    });
    this.write();
  }

  getRandomVolume(): Volume {
    const book =
      this.data.books[Math.floor(Math.random() * this.data.books.length)];
    return book.volumes[Math.floor(Math.random() * book.volumes.length)];
  }

  findBookByVolumeId(volumeId: string): Book | undefined {
    return this.data.books.find((book) =>
      book.volumes.some((volume) => volume.id === volumeId),
    );
  }
}
