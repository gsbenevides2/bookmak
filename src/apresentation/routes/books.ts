import { Router } from "express";
import * as booksController from "../controllers/books";

const booksRouter = Router();

booksRouter.get("/", booksController.getBooks);
booksRouter.get("/categories", booksController.getCategories);
booksRouter.get("/:id", booksController.getBookById);

export default booksRouter;
