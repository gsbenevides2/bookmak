import { type Controller } from "../types/controller";
import { MockResponses } from "../mocks/mock";
import getBooks from "../useCases/books/getBooks";
import getCategories from "../useCases/books/getCategories";
import getAuthors from "../useCases/books/getAuthors";
import getBookById from "../useCases/books/getBook";

export const getBooksController: Controller = (req, res) => {
  const filters = req.query;
  console.log("Request received");
  Promise.all([
    getBooks({
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
    getCategories(),
    getAuthors(),
  ]).then(([books, categories, authors]) => {
    console.log("request processed");
    res.render("books", { books, filters, categories, authors });
  });
};

export const getBookByIdController: Controller = (req, res) => {
  const { id } = req.params;
  getBookById(id).then((book) => {
    if (book == null) return res.status(404).send("Book not found");
    res.render("book", { book });
  });
};
