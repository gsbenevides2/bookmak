import { type DataSource } from "typeorm";
import dataSourceConfig from "./dataSourceConfig";

export class DatabaseConnection {
  private dataSource: DataSource | null = null;

  private static readonly instance: DatabaseConnection =
    new DatabaseConnection();

  public async connect(): Promise<void> {
    if (this.dataSource == null) {
      this.dataSource = dataSourceConfig;

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
