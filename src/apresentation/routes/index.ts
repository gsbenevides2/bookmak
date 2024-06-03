import cookieParser from "cookie-parser";
import express, { Router } from "express";
import minifyHTML from "express-minify-html-2";
import { orderProvider } from "../middlewares/orderProvider";
import locals from "../views/locals";
import accountsRouter from "./accounts";
import adminRouter from "./admin";
import booksRouter from "./books";
import checkoutRouter from "./checkout";
import loginRouter from "./login";

const defaultRouter = Router();

defaultRouter.use(express.json());
defaultRouter.use(cookieParser());
defaultRouter.use(express.urlencoded({ extended: true }));

defaultRouter.use(
  minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true,
    },
  }),
);

defaultRouter.use(orderProvider);
defaultRouter.use("/books", booksRouter);
defaultRouter.use("/accounts", accountsRouter);
defaultRouter.use("/login", loginRouter);
defaultRouter.use("/checkout", checkoutRouter);
defaultRouter.use("/admin", adminRouter);
defaultRouter.use(
  express.static("src/apresentation/public", {
    extensions: ["html", "htm"],
  }),
);
defaultRouter.get("/", (_req, res) => {
  res.redirect("/books");
});

export default function setupServer(server: express.Express): void {
  server.use(defaultRouter);
  server.set("views", "src/apresentation/views");
  server.set("view engine", "ejs");
  server.locals = {
    ...locals,
  };
}
