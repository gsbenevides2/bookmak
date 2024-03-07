import express from "express";
import "reflect-metadata";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.set("view engine", "ejs");

const serverPort = process.env.PORT ?? 3000;

server.get("/", (_req, res) => {
  res.render("index");
});

server.listen(serverPort, () => {
  console.log(`Server is running at http://localhost:${serverPort}`);
});
