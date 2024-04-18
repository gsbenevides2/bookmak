import pg from "pg";
import { config } from "dotenv";
import path from "path";
import fs from "fs";
export interface Customer {
  isAdmin: boolean;
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  phoneType: string;
  phoneAreaCode: string;
  phoneNumber: string;
  cpf: string;
  password: string;
  addresses: Address[];
  cards: Card[];
}

export interface Address {
  id: string;
  houseType: string;
  streetType: string;
  nickname: string;
  street: string;
  number: string;
  district: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  observations: string;
  customerId: string;
}

export interface Card {
  id: string;
  number: string;
  holderName: string;
  flag: string;
  cvv: string;
  monthOfValidity: string;
  yearOfValidity: string;
  customerId: string;
}

function getDbConn(): pg.Client {
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

export async function createDemoCustommer(): Promise<Customer> {
  const customer: Customer = {
    isAdmin: false,
    id: "dfd05c29-ca9e-4f06-8cea-72285bcdd5a6",
    name: "Guilherme da Silva Benevides",
    email: "gsbenevides2@gmail.com",
    cpf: "56840932800",
    password: "SenhaFraca123",
    gender: "male",
    phoneType: "landline",
    phoneAreaCode: "11",
    phoneNumber: "972839087",
    dateOfBirth: new Date("2003-05-29").toISOString(),
    addresses: [
      {
        id: "ac6ed37c-879f-4d12-907b-3006bbdc5081",
        nickname: "Casa",
        street: "Cinco",
        houseType: "house",
        streetType: "street",
        number: "18",
        district: "Jardim Brasil",
        zipCode: "08633138",
        city: "Suzano",
        state: "São Paulo",
        country: "Brasil",
        observations: "",
        customerId: "dfd05c29-ca9e-4f06-8cea-72285bcdd5a6",
      },
    ],
    cards: [
      {
        id: "afbebd82-4398-4409-9344-aeed289e896f",
        number: "5376996989207547",
        holderName: "Guilherme Benevides",
        flag: "visa",
        cvv: "362",
        monthOfValidity: "10",
        yearOfValidity: "2025",
        customerId: "dfd05c29-ca9e-4f06-8cea-72285bcdd5a6",
      },
    ],
  };

  const dateOfBirth = new Date(customer.dateOfBirth)
    .toISOString()
    .replace("T", " ")
    .replace("Z", "");

  const createAddress = `INSERT INTO "address"("id","houseType","streetType","nickname","street","number","district","zipCode","city","state","country","active", "customerId") VALUES('${customer.addresses[0].id}','${customer.addresses[0].houseType}','${customer.addresses[0].streetType}','${customer.addresses[0].nickname}','${customer.addresses[0].street}','${customer.addresses[0].number}','${customer.addresses[0].district}','${customer.addresses[0].zipCode}','${customer.addresses[0].city}','${customer.addresses[0].state}','${customer.addresses[0].country}',true, NULL);`;
  const createCustomerSql = `INSERT INTO "customer"("id","email","name","cpf","dateOfBirth","gender","phoneType","phoneAreaCode","phoneNumber","isActive","password","deliveryAddressId","billingAddressId") VALUES('${customer.id}', '${customer.email}','${customer.name}','${customer.cpf}','${dateOfBirth}','${customer.gender}','${customer.phoneType}','${customer.phoneAreaCode}','${customer.phoneNumber}',true,'${customer.password}','${customer.addresses[0].id}','${customer.addresses[0].id}');`;
  const createCard = `INSERT INTO "card"("id","number","holderName","flag","cvv","monthOfValidity","yearOfValidity","active","customerId") VALUES('${customer.cards[0].id}','${customer.cards[0].number}','${customer.cards[0].holderName}','${customer.cards[0].flag}','${customer.cards[0].cvv}','${customer.cards[0].monthOfValidity}','${customer.cards[0].yearOfValidity}',true,'${customer.id}');`;
  const updateAddressForCustomer = `UPDATE "address" SET "customerId"='${customer.id}' WHERE id='${customer.addresses[0].id}'`;
  const dbConnection = getDbConn();
  await dbConnection.connect();
  await dbConnection.query(createAddress);
  await dbConnection.query(createCustomerSql);
  await dbConnection.query(createCard);
  await dbConnection.query(updateAddressForCustomer);
  await dbConnection.end();
  return customer;
}

export async function createDemoAdmin(): Promise<Customer> {
  const customer: Customer = {
    isAdmin: true,
    id: "0c63db91-5b6f-4da7-854f-9fc3e2769948",
    name: "Pedro Samuel Davi Santos",
    email: "pedrosamuelsantos@sabereler.com.br",
    dateOfBirth: new Date("1997-11-12").toISOString(),
    cpf: "39820645115",
    password: "XxQQ91Wep0",
    gender: "male",
    phoneType: "landline",
    phoneAreaCode: "11",
    phoneNumber: "987654321",
    addresses: [
      {
        id: "93dbd005-1efa-4caa-88c7-cf056be5e8b1",
        nickname: "Casa",
        street: "Rio Tarumã",
        houseType: "house",
        streetType: "street",
        number: "18",
        district: "Jardim Brasil",
        zipCode: "08633138",
        city: "Suzano",
        state: "São Paulo",
        country: "Brasil",
        observations: "",
        customerId: "0c63db91-5b6f-4da7-854f-9fc3e2769948",
      },
    ],
    cards: [
      {
        id: "0bbd46f4-6b0b-4cec-99de-d3dd5dd09b17",
        number: "5101426033578885",
        holderName: "Pedro Santos",
        flag: "mastercard",
        cvv: "318",
        monthOfValidity: "11",
        yearOfValidity: "2025",
        customerId: "0c63db91-5b6f-4da7-854f-9fc3e2769948",
      },
    ],
  };

  const dateOfBirth = new Date(customer.dateOfBirth)
    .toISOString()
    .replace("T", " ")
    .replace("Z", "");

  const createAddress = `INSERT INTO "address"("id","houseType","streetType","nickname","street","number","district","zipCode","city","state","country","active", "customerId") VALUES('${customer.addresses[0].id}','${customer.addresses[0].houseType}','${customer.addresses[0].streetType}','${customer.addresses[0].nickname}','${customer.addresses[0].street}','${customer.addresses[0].number}','${customer.addresses[0].district}','${customer.addresses[0].zipCode}','${customer.addresses[0].city}','${customer.addresses[0].state}','${customer.addresses[0].country}',true, NULL);`;
  const createCustomerSql = `INSERT INTO "customer"("id","email","name","cpf","dateOfBirth","gender","phoneType","phoneAreaCode","phoneNumber","isActive","password","deliveryAddressId","billingAddressId", "isAdmin") VALUES('${customer.id}', '${customer.email}','${customer.name}','${customer.cpf}','${dateOfBirth}','${customer.gender}','${customer.phoneType}','${customer.phoneAreaCode}','${customer.phoneNumber}',true,'${customer.password}','${customer.addresses[0].id}','${customer.addresses[0].id}', TRUE);`;
  const createCard = `INSERT INTO "card"("id","number","holderName","flag","cvv","monthOfValidity","yearOfValidity","active","customerId") VALUES('${customer.cards[0].id}','${customer.cards[0].number}','${customer.cards[0].holderName}','${customer.cards[0].flag}','${customer.cards[0].cvv}','${customer.cards[0].monthOfValidity}','${customer.cards[0].yearOfValidity}',true,'${customer.id}');`;
  const updateAddressForCustomer = `UPDATE "address" SET "customerId"='${customer.id}' WHERE id='${customer.addresses[0].id}'`;

  const dbConnection = getDbConn();
  await dbConnection.connect();
  await dbConnection.query(createAddress);
  await dbConnection.query(createCustomerSql);
  await dbConnection.query(createCard);
  await dbConnection.query(updateAddressForCustomer);
  await dbConnection.end();
  return customer;
}

export async function createDemoAddress(userId: string): Promise<Address> {
  const address: Address = {
    id: "576c0d86-12a2-4c61-92de-6fdf9e58ce5b",
    houseType: "apartment",
    streetType: "avenue",
    nickname: "Trabalho",
    street: "Paulista",
    number: "1000",
    district: "Bela Vista",
    zipCode: "01310100",
    city: "São Paulo",
    state: "São Paulo",
    country: "Brasil",
    observations: "",
    customerId: userId,
  };
  const addreessSQl = `INSERT INTO "address"("id","houseType","streetType","nickname","street","number","district","zipCode","city","state","country","active", "customerId") VALUES('${address.id}','${address.houseType}','${address.streetType}','${address.nickname}','${address.street}','${address.number}','${address.district}','${address.zipCode}','${address.city}','${address.state}','${address.country}',true, '${userId}');`;

  const dbConnection = getDbConn();
  await dbConnection.connect();
  await dbConnection.query(addreessSQl);
  await dbConnection.end();
  return address;
}

export async function createDemoCard(userId: string) {
  const card: Card = {
    id: "68ffda4d-0e5f-4af1-8ec3-fc4970938eba",
    number: "5425233430109903",
    holderName: "Guilherme Benevides",
    flag: "visa",
    cvv: "362",
    monthOfValidity: "10",
    yearOfValidity: "2025",
    customerId: userId,
  };
  const cardSQL = `INSERT INTO "card"("id","number","holderName","flag","cvv","monthOfValidity","yearOfValidity","active","customerId") VALUES('${card.id}','${card.number}','${card.holderName}','${card.flag}','${card.cvv}','${card.monthOfValidity}','${card.yearOfValidity}',true,'${userId}');`;
  const dbConnection = getDbConn();
  await dbConnection.connect();
  await dbConnection.query(cardSQL);
  await dbConnection.end();
  return card;
}

export async function down(): Promise<null> {
  const dbConnection = getDbConn();
  await dbConnection.connect();
  await dbConnection.query('UPDATE "address" set "customerId" = NULL');
  await dbConnection.query('DELETE FROM "order_update"');
  await dbConnection.query('DELETE FROM "book_authors"');
  await dbConnection.query('DELETE FROM "book_categories"');
  await dbConnection.query('DELETE FROM "order_item"');
  await dbConnection.query('DELETE FROM "book_sku"');
  await dbConnection.query('DELETE FROM "order_payment_method"');
  await dbConnection.query('DELETE FROM "author"');
  await dbConnection.query('DELETE FROM "category"');
  await dbConnection.query('DELETE FROM "book"');
  await dbConnection.query('DELETE FROM "order"');
  await dbConnection.query('DELETE FROM "card"');
  await dbConnection.query('DELETE FROM "customer"');
  await dbConnection.query('DELETE FROM "address"');
  await dbConnection.end();
  return null;
}
