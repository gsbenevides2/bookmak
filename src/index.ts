import "dotenv/config";
import "reflect-metadata";
import express from "express";

import { DatabaseConnection } from "./persistence/dbConnection";
import { BookmarkGenerator } from "./utils/generateBookmarks";

import setupServer from "./apresentation/routes";

const server = express();
const serverPort = process.env.PORT ?? 3000;
setupServer(server);
server.listen(serverPort, () => {
  DatabaseConnection.getDataSource()
    .then(async () => {
      await BookmarkGenerator.getInstance()
        .loadOpenAi()
        .then(() => {
          console.debug(`Server is running at http://localhost:${serverPort}`);
        });
    })
    .catch((error) => {
      console.error(
        `Error connecting to database or initialize OpenAI API:`,
        error,
      );
    });
});
