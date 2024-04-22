import { getConnection } from "./getConnnection";

export async function downDatabase(): Promise<null> {
  const dbConnection = getConnection();
  await dbConnection.transaction(async (trx) => {
    await trx.raw('UPDATE "address" set "customerId" = NULL');
    await trx.raw('DELETE FROM "order_update"');
    await trx.raw('DELETE FROM "book_authors"');
    await trx.raw('DELETE FROM "book_categories"');
    await trx.raw('DELETE FROM "order_item"');
    await trx.raw('DELETE FROM "book_sku"');
    await trx.raw('DELETE FROM "order_payment_method"');
    await trx.raw('DELETE FROM "author"');
    await trx.raw('DELETE FROM "category"');
    await trx.raw('DELETE FROM "book"');
    await trx.raw('DELETE FROM "order"');
    await trx.raw('DELETE FROM "card"');
    await trx.raw('DELETE FROM "coupon"');
    await trx.raw('DELETE FROM "customer"');
    await trx.raw('DELETE FROM "address"');
    await trx.commit();
  });
  await dbConnection.destroy();
  return null;
}
