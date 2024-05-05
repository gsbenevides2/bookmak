import { type Controller } from "./types";
import booksUseCases from "../../business/useCases/books";

export const getBooks: Controller = (req, res) => {
  const filters = req.query;
  let minPrice: number | undefined;
  if (typeof filters.minPrice === "string" && filters.minPrice.trim() !== "") {
    const floatMinPrice = parseFloat(filters.minPrice);
    const intMinPrice = parseInt((floatMinPrice * 100).toFixed(0));
    minPrice = intMinPrice;
  }

  let maxPrice: number | undefined;
  if (typeof filters.maxPrice === "string" && filters.maxPrice.trim() !== "") {
    const floatMaxPrice = parseFloat(filters.maxPrice);
    const intMaxPrice = parseInt((floatMaxPrice * 100).toFixed(0));
    maxPrice = intMaxPrice;
  }

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
      minPrice,
      maxPrice,
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
