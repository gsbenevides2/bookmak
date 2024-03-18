import { DataSource } from "typeorm";
import path from "path";
function getEnviromentVariable(variable: string): string {
  const value = process.env[variable];
  if (value == null) {
    throw new Error(`Environment variable ${variable} not set`);
  }

  return value;
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class DatabaseConnection {
  private static dataSource: DataSource;

  public static async connect(): Promise<void> {
    if (this.dataSource == null) {
      this.dataSource = new DataSource({
        type: getEnviromentVariable("DB_TYPE") as any,
        host: getEnviromentVariable("DB_HOST"),
        port: parseInt(getEnviromentVariable("DB_PORT")),
        username: getEnviromentVariable("DB_USERNAME"),
        password: getEnviromentVariable("DB_PASSWORD"),
        database: getEnviromentVariable("DB_DATABASE"),
        synchronize: process.env.DB_SYNCHRONIZE === "true",
        logging: process.env.DB_LOGGING === "true",
        entities: [path.join(__dirname, "models", "*")],
      });

      await this.dataSource.initialize();
    }
  }

  public static async getDataSource(): Promise<DataSource> {
    if (this.dataSource == null) {
      await this.connect();
    }
    return this.dataSource;
  }
}
