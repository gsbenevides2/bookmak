import { DefaultNamingStrategy, Table } from "typeorm";

export class MyNamingStrategy extends DefaultNamingStrategy {
  relationConstraintName(
    tableOrName: string | Table,
    columnNames: string[],
    where?: string | undefined,
  ): string {
    if (tableOrName === "customer") {
      if (columnNames[0] === "delivery_address_id")
        return "unique_delivery_address_id";
      if (columnNames[0] === "billing_address_id")
        return "unique_billing_address_id";
    }

    return super.relationConstraintName(tableOrName, columnNames, where);
  }

  primaryKeyName(tableOrName: string | Table, columnNames: string[]): string {
    if (tableOrName instanceof Table) {
      if (tableOrName.name === "book_categories") return "pk_book_categories";
      if (tableOrName.name === "book_authors") return "pk_book_authors";
    }
    return super.primaryKeyName(tableOrName, columnNames);
  }

  indexName(
    tableOrName: string | Table,
    columnNames: string[],
    where?: string | undefined,
  ): string {
    const validTableNames = ["book_authors", "book_categories"];
    const validColumnNames = ["book_id", "author_id", "category_id"];
    const tableName =
      typeof tableOrName === "string" ? tableOrName : tableOrName.name;
    const hasValidTable = validTableNames.includes(tableName);
    const hasValidColumn = columnNames.every((columnName) =>
      validColumnNames.includes(columnName),
    );
    if (hasValidTable && hasValidColumn) {
      return `idx_${tableName}_${columnNames.join("_")}`;
    }

    console.log(tableOrName, columnNames, where);
    return super.indexName(tableOrName, columnNames, where);
  }
}
