import { type Controller } from "../types/controller";
import { MockResponses } from "../mocks/mock";

export const getBooksController: Controller = (req, res) => {
  const filters = req.query;

  let books = MockResponses.books;
  const categories = MockResponses.categories;
  const authors = MockResponses.authors;

  if (filters.category != null) {
    const catId = parseInt(filters.category as string);
    const category = categories.find((cat) => cat.id === catId);
    if (category == null) return res.status(404).send("Category not found");
    books = books.filter((book) => book.category === category.name);
  }
  if (filters.author != null) {
    const authorId = parseInt(filters.author as string);
    const author = authors.find((auth) => auth.id === authorId);
    if (author == null) return res.status(404).send("Author not found");
    books = books.filter((book) => book.author === author.name);
  }
  if (filters.searchQuery != null) {
    const search = filters.searchQuery as string;

    books = books.filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.description.toLowerCase().includes(search.toLowerCase()),
    );
  }
  res.render("books", { books, filters, categories, authors });
};

export const getBookByIdController: Controller = (req, res) => {
  const { id } = req.params;
  const book = MockResponses.books.find((book) => book.id === id);
  if (book == null) return res.status(404).send("Book not found");
  res.render("book", { book });
};
