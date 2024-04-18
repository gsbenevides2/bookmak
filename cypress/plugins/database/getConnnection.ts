import path from "path";
import pg from "pg";
import { config } from "dotenv";
import fs from "fs";

export function getConnection(): pg.Client {
  const cypressEnvPath = path.resolve(process.cwd(), "..", "..", ".env.test");
  const defaultEnvPath = path.resolve(process.cwd(), ".env.test");
  const envPath = fs.existsSync(cypressEnvPath)
    ? cypressEnvPath
    : defaultEnvPath;

  const dbCredentials = config({
    path: envPath,
  });

  if (dbCredentials.parsed == null)
    throw new Error("Error while reading credentials for test");

  const dbConnection = new pg.Client({
    host: dbCredentials.parsed.DB_HOST,
    port: parseInt(dbCredentials.parsed.DB_PORT),
    database: dbCredentials.parsed.DB_DATABASE,
    user: dbCredentials.parsed.DB_USERNAME,
    password: dbCredentials.parsed.DB_PASSWORD,
  });
  return dbConnection;
}
