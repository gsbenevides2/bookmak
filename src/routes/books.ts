import { Router } from "express";
import * as booksController from "../controllers/books";

const booksRouter = Router();

booksRouter.get("/", booksController.getBooksController);
booksRouter.get("/:id", booksController.getBookByIdController);

export default booksRouter;
