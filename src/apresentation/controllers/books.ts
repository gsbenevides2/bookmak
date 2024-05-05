import { type Controller } from "./types";
import booksUseCases from "../../business/useCases/books";

export const getBooks: Controller = (req, res) => {
  const filters = req.query;
  Promise.all([
    booksUseCases.getBooks({
      categoryId:
        typeof filters.category === "string" && filters.category.trim() !== ""
          ? filters.category
          : undefined,
      authorId:
        typeof filters.author === "string" && filters.author.trim() !== ""
          ? filters.author
          : undefined,
      searchQuery:
        typeof filters.searchQuery === "string" &&
        filters.searchQuery.trim() !== ""
          ? filters.searchQuery
          : undefined,
      minPrice:
        typeof filters.minPrice === "string" && filters.minPrice.trim() !== ""
          ? parseInt(filters.minPrice) * 100
          : undefined,
      maxPrice:
        typeof filters.maxPrice === "string" && filters.maxPrice.trim() !== ""
          ? parseInt(filters.maxPrice) * 100
          : undefined,
    }),
    booksUseCases.getCategories(),
    booksUseCases.getAuthors(),
  ])
    .then(([books, categories, authors]) => {
      res.render("books", { books, filters, categories, authors });
    })
    .catch((err) => {
      console.error("Error getting books", err);
      res.status(500).send("Internal server error");
    });
};

export const getBookById: Controller = (req, res) => {
  const { id } = req.params;
  booksUseCases
    .getBookById(id)
    .then((book) => {
      if (book == null) return res.status(404).send("Book not found");
      res.render("book", { book });
    })
    .catch((err) => {
      console.error("Error getting book by id", err);
      res.status(500).send("Internal server error");
    });
};
