import "dotenv/config";
import "reflect-metadata";
import express from "express";

import booksRouter from "./routes/books";
import accountsRouter from "./routes/accounts";
import loginRouter from "./routes/login";
import checkoutRouter from "./routes/checkout";
import minifyHTML from "express-minify-html-2";
import * as locals from "./utils/locals";
import cookieParser from "cookie-parser";
import { DatabaseConnection } from "./dbConnection";
import { MockResponses } from "./mocks/mock";
import adminRouter from "./routes/admin";
import { orderProvider } from "./middlewares/orderProvider";
import { BookmarkGenerator } from "./utils/generateBookmarks";

const server = express();
const serverPort = process.env.PORT ?? 3000;

server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("src/public"));
server.set("views", "src/views");
server.set("view engine", "ejs");
server.locals = {
  ...locals,
};

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

server.use(orderProvider);
server.use("/books", booksRouter);
server.use("/accounts", accountsRouter);
server.use("/login", loginRouter);
server.use("/checkout", checkoutRouter);
server.use("/admin", adminRouter);

server.use("/status", (_req, res) => {
  res.status(200).send("Server is running");
});

server.get("/", (_req, res) => {
  console.log("Redirecting to /books");
  res.redirect("/books");
});

server.get("/test/clearMocks", (_req, res) => {
  MockResponses.clearMocks();
  res.status(200).send("Mocks cleared");
});

server.get("/test/getMocks", (_req, res) => {
  res.status(200).send(MockResponses.getMocks());
});

server.post("/test/setMocks", (req, res) => {
  MockResponses.setMocks(JSON.stringify(req.body));
  res.status(200).send("Mocks set");
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
server.listen(serverPort, async () => {
  await DatabaseConnection.connect();
  await BookmarkGenerator.loadOpenAi();
  console.log(`Server is running at http://localhost:${serverPort}`);
});
