import { DataSource } from "typeorm";
import path from "path";
function getEnviromentVariable(variable: string): string {
  const value = process.env[variable];
  if (value == null) {
    throw new Error(`Environment variable ${variable} not set`);
  }

  return value;
}

export class DatabaseConnection {
  private dataSource: DataSource | null = null;

  private static readonly instance: DatabaseConnection =
    new DatabaseConnection();

  public async connect(): Promise<void> {
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
    if (this.instance.dataSource == null) {
      await this.instance.connect();
      return await this.getDataSource();
    } else {
      return this.instance.dataSource;
    }
  }
}
