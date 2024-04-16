import { type Controller } from "../types/controller";
import booksUseCases from "../useCases/books";

export const getBooks: Controller = (req, res) => {
  const filters = req.query;
  console.log("Request received");
  Promise.all([
    booksUseCases.getBooks({
      categoryId: filters.category as string,
      authorId: filters.author as string,
      searchQuery: filters.searchQuery as string,
      minPrice:
        typeof filters.minPrice === "string"
          ? parseInt(filters.minPrice) * 100
          : undefined,
      maxPrice:
        typeof filters.maxPrice === "string"
          ? parseInt(filters.maxPrice) * 100
          : undefined,
    }),
    booksUseCases.getCategories(),
    booksUseCases.getAuthors(),
  ]).then(([books, categories, authors]) => {
    console.log("request processed");
    res.render("books", { books, filters, categories, authors });
  });
};

export const getBookById: Controller = (req, res) => {
  const { id } = req.params;
  booksUseCases.getBookById(id).then((book) => {
    if (book == null) return res.status(404).send("Book not found");
    res.render("book", { book });
  });
};
