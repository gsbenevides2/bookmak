import knex from "knex";
import LowDb, { type Book } from "./lowdb";
import { type OrderToDB } from "./makeOrders";

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? "3306"),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

export async function createBook(book: Book): Promise<void> {
  const bookContent = {
    id: book.id,
    title: book.title,
    cover: book.cover,
    description: book.translatedDescription ?? book.description,
    bookmarkStyle: book.bookmarkStyle,
  };

  await db("book").insert(bookContent).onConflict(["id"]).merge();

  await Promise.all(
    book.authors.map(async (author) => {
      const authorContent = {
        id: author.id,
        name: author.name,
      };

      await db("author").insert(authorContent).onConflict(["id"]).merge();

      await db("book_authors")
        .insert({
          authorId: author.id,
          bookId: book.id,
        })
        .onConflict(["authorId", "bookId"])
        .ignore();
    }),
  );
  await Promise.all(
    book.categories.map(async (category) => {
      const categoryContent = {
        id: category.id,
        name: category.translatedName ?? category.name,
      };
      await db("category").insert(categoryContent).onConflict(["id"]).merge();
      await db("book_categories")
        .insert({
          categoryId: category.id,
          bookId: book.id,
        })
        .onConflict(["categoryId", "bookId"])
        .merge();
    }),
  );
  await Promise.all(
    book.volumes.map(async (volume) => {
      const skuContent = {
        id: volume.id,
        title: `${book.title} - Volume ${volume.number}`,
        cover: volume.cover,
        description: book.translatedDescription ?? book.description,
        price: volume.price,
        stockQuantity: volume.stockQuantity,
        bookId: book.id,
      };

      await db("book_sku").insert(skuContent).onConflict(["id"]).merge();
    }),
  );
}

export async function syncronizeBooks(): Promise<void> {
  const books = LowDb.getInstance().data.books;
  console.log("Syncronizing books in PostgreSQL");
  await Promise.all(
    books.map(async (book) => {
      await createBook(book);
    }),
  );
  console.log("Books syncronized in PostgreSQL");
}

export async function getCustomerId(): Promise<string | null> {
  const result = await db("customer").select("id").limit(1);
  return result[0].id;
}

export async function getCardIdOfCustomer(
  customerId: string,
): Promise<string | null> {
  const result = await db("card")
    .select("id")
    .where("customerId", customerId)
    .limit(1);
  return result[0].id;
}

export async function getAddressIdOfCustomer(
  customerId: string,
): Promise<string | null> {
  const result = await db("customer")
    .select("deliveryAddressId")
    .where("id", customerId)
    .limit(1);
  return result[0].deliveryAddressId;
}

export async function saveOrderInDatabase(order: OrderToDB): Promise<void> {
  await db("order").insert({
    id: order.orderId,
    subtotal: order.subtotal,
    totalPrice: order.totalPrice,
    shippingPrice: order.shippingPrice,
    bookmarkStyle: order.bookmarkStyle,
    bookmarkText: order.bookmarkText,
    customerId: order.customerId,
    billingAddressId: order.billingAddressId,
    shippingAddressId: order.shippingAddressId,
  });

  await db("order_payment_method").insert({
    orderId: order.orderId,
    cardId: order.cardId,
    value: order.totalPrice,
  });

  await db("order_update").insert({
    orderId: order.orderId,
    status: "processing",
    observations: "Estamos recebendo seu pagamento. Aguarde!",
    timestamp: order.createdDate,
  });

  await db("order_item").insert(
    order.itensData.map((item) => ({
      orderId: order.orderId,
      skuId: item.skuId,
      quantity: item.quantity,
      unitSellPrice: item.unitSellPrice,
    })),
  );
}
