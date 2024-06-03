import { faker } from "@faker-js/faker";
import "dotenv/config";
import {
  getAddressIdOfCustomer,
  getCardIdOfCustomer,
  getCustomerId,
  saveOrderInDatabase,
} from "./database";
import LowDb from "./lowdb";

export interface OrderToDB {
  orderId: string;
  customerId: string;
  subtotal: number;
  totalPrice: number;
  shippingPrice: number;
  bookmarkStyle: string;
  bookmarkText: string;
  billingAddressId: string;
  shippingAddressId: string;
  itensData: Array<{
    quantity: number;
    unitSellPrice: number;
    skuId: string;
  }>;
  cardId: string;
  createdDate: Date;
}

export async function makeOrder(): Promise<OrderToDB> {
  const createdDate = faker.date.between({
    from: new Date("2020-01-01"),
    to: new Date("2021-01-01"),
  });
  const customerId = await getCustomerId();
  if (customerId == null) {
    throw new Error("No customer found");
  }
  const cardId = await getCardIdOfCustomer(customerId);
  if (cardId == null) {
    throw new Error("No card found");
  }
  const lowDb = LowDb.getInstance();
  const orderId = faker.string.uuid();
  const quantityOfItens = faker.number.int({
    min: 1,
    max: 5,
  });
  const itensData: OrderToDB["itensData"] = [];
  while (itensData.length < quantityOfItens) {
    const volume = lowDb.getRandomVolume();
    const thisVolumeAreadyInOrder = itensData.find(
      (item) => item.skuId === volume.id,
    );
    if (thisVolumeAreadyInOrder != null) {
      continue;
    }
    const quantity = faker.number.int({
      min: 1,
      max: 5,
    });
    itensData.push({
      quantity,
      unitSellPrice: volume.price,
      skuId: volume.id,
    });
  }
  const subtotal = itensData.reduce(
    (acc, item) => acc + item.quantity * item.unitSellPrice,
    0,
  );
  const shippingPrice = faker.number.int({ min: 1000, max: 5000 });
  const totalPrice = subtotal + shippingPrice;

  const bookmarkStyle = faker.helpers.arrayElement(
    lowDb.data.books.map((book) => book.bookmarkStyle).filter(Boolean),
  );
  const bookmarkText = faker.helpers.arrayElement([
    "Bookmark text",
    "Bookmark text 2",
  ]);

  const billingAddressId = await getAddressIdOfCustomer(customerId);
  if (billingAddressId == null) {
    throw new Error("No billing address found");
  }
  const shippingAddressId = billingAddressId;

  const order: OrderToDB = {
    orderId,
    customerId,
    subtotal,
    totalPrice,
    shippingPrice,
    bookmarkStyle: bookmarkStyle ?? "",
    bookmarkText,
    billingAddressId,
    shippingAddressId,
    itensData,
    cardId,
    createdDate,
  };

  return order;
}

async function start(): Promise<void> {
  const qtd = 1000;
  for (let i = 0; i < qtd; i++) {
    await makeOrder().then(saveOrderInDatabase);
    console.log(`Order ${i + 1} of ${qtd} created`);
  }
}

void start();
