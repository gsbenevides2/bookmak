import { TypeormStore } from "connect-typeorm";
import console from "console";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express, { Router } from "express";
import fileUpload from "express-fileupload";
import minifyHTML from "express-minify-html-2";
import session from "express-session";
import { Session } from "../../business/models/Session";
import { DatabaseConnection } from "../../persistence/dbConnection";
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

defaultRouter.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    useTempFiles: true,
    tempFileDir: "/tmp/",
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

export async function setupSession(server: express.Express): Promise<void> {
  const repository = await DatabaseConnection.getDataSource().then(
    (dataSource) => dataSource.getRepository(Session),
  );
  const sessionSecret = process.env.SESSION ?? "secret";
  const enableSecureCookie = process.env.ENABLE_SECURE_COOKIE === "true";
  server.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: enableSecureCookie },
      store: new TypeormStore({
        cleanupLimit: 2,
        limitSubquery: false,
        ttl: 86400,
      }).connect(repository),
    }),
  );
}
export default async function setupServer(
  server: express.Express,
): Promise<void> {
  console.log("Setting up server");
  await setupSession(server);
  console.log("Session setup");
  server.use(defaultRouter);
  server.set("views", "src/apresentation/views");
  server.set("view engine", "ejs");
  server.locals = {
    ...locals,
  };
}
