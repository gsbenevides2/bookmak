import { DatabaseConnection } from "../../dbConnection";
import { Customer } from "../../models/Customer";

export default async function deactivateAccount(
  accountId: string,
): Promise<void> {
  const dataSource = await DatabaseConnection.getDataSource();
  await dataSource.getRepository(Customer).update(
    {
      id: accountId,
    },
    {
      isActive: false,
    },
  );
}
