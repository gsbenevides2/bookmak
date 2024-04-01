import "dotenv/config";
import "reflect-metadata";
import express from "express";

import booksRouter from "./routes/books";
import accountsRouter from "./routes/accounts";
import loginRouter from "./routes/login";
import checkoutRouter from "./routes/checkout";
import minifyHTML from "express-minify-html-2";

import cookieParser from "cookie-parser";

const server = express();
const serverPort = process.env.PORT ?? 3000;

server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("dist/public"));
server.set("views", "dist/views");
server.set("view engine", "ejs");

server.use(
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

server.use("/books", booksRouter);
server.use("/accounts", accountsRouter);
server.use("/login", loginRouter);
server.use("/checkout", checkoutRouter);

server.use("/status", (_req, res) => {
  res.status(200).send("Server is running");
});

server.get("/", (_req, res) => {
  res.redirect("/books");
});

server.listen(serverPort, () => {
  console.log(`Server is running at http://localhost:${serverPort}`);
});
