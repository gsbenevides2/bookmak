import "dotenv/config";
import path from "path";
import { DataSource } from "typeorm";
function getEnviromentVariable(variable: string): string {
  const value = process.env[variable];
  if (value == null) {
    throw new Error(`Environment variable ${variable} not set`);
  }
  return value;
}

export default new DataSource({
  type: getEnviromentVariable("DB_TYPE") as any,
  host: getEnviromentVariable("DB_HOST"),
  port: parseInt(getEnviromentVariable("DB_PORT")),
  username: getEnviromentVariable("DB_USERNAME"),
  password: getEnviromentVariable("DB_PASSWORD"),
  database: getEnviromentVariable("DB_DATABASE"),
  synchronize: false,
  migrations: [path.join(__dirname, "..", "persistence", "migrations", "*")],
  logging: process.env.DB_LOGGING === "true",
  entities: [
    path.join(__dirname, "..", "business", "models", "*"),
    path.join(__dirname, "..", "persistence", "views", "*"),
  ],
});
