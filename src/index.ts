import "dotenv/config";
import express from "express";
import "reflect-metadata";

import { DatabaseConnection } from "./persistence/dbConnection";
import { BookmarkGenerator } from "./utils/generateBookmarks";

import setupServer from "./apresentation/routes";

async function startSystems() {
  console.log("Starting systems...");
  console.log("Connecting to database...");
  await DatabaseConnection.getDataSource();
  console.log("Database connected!");
  console.log("Initializing OpenAI API...");
  await BookmarkGenerator.getInstance().loadOpenAi();
  console.log("OpenAI API initialized!");
  console.log("Starting server...");
  const server = express();
  const serverPort = process.env.PORT ?? 3000;
  await setupServer(server);
  server.listen(serverPort, () => {
    console.log(`Server is running at http://localhost:${serverPort}`);
  });
}

startSystems().catch((error) => {
  console.error("Error starting systems", error);
  process.exit(1);
});
