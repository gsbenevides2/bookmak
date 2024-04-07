import pg from "pg";
import { config } from "dotenv";
import path from "path";
import fs from "fs";
export interface Customer {
  isAdmin: boolean;
  id: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  addresses: {
    id: string;
    nickname: string;
    street: string;
  }[];
  cards: {
    id: string;
    number: string;
    holderName: string;
    flag: string;
    cvv: string;
    monthOfValidity: string;
    yearOfValidity: string;
  }[];
}

function getDbConn() {
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
    host: dbCredentials.parsed["DB_HOST"],
    port: parseInt(dbCredentials.parsed["DB_PORT"]),
    database: dbCredentials.parsed["DB_DATABASE"],
    user: dbCredentials.parsed["DB_USERNAME"],
    password: dbCredentials.parsed["DB_PASSWORD"],
  });
  return dbConnection;
}

export async function createDemoCustommer() {
  const customer: Customer = {
    isAdmin: false,
    id: "dfd05c29-ca9e-4f06-8cea-72285bcdd5a6",
    name: "Guilherme da Silva Benevides",
    email: "gsbenevides2@gmail.com",
    cpf: "56840932800",
    password: "SenhaFraca123",
    addresses: [
      {
        id: "ac6ed37c-879f-4d12-907b-3006bbdc5081",
        nickname: "Casa",
        street: "Cinco",
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
      },
    ],
  };

  const createAddress = `INSERT INTO "address"("id","houseType","streetType","nickname","street","number","district","zipCode","city","state","country","active", "customerId") VALUES('${customer.addresses[0].id}','house','street','Casa','${customer.addresses[0].street}','18','Jardim Brasil','08633138','Suzano','São Paulo','Brasil',true, NULL);`;
  const createCustomerSql = `INSERT INTO "customer"("id","email","name","cpf","dateOfBirth","gender","phoneType","phoneAreaCode","phoneNumber","isActive","password","deliveryAddressId","billingAddressId") VALUES('${customer.id}', '${customer.email}','${customer.name}','${customer.cpf}','2003-05-29 21:00:00','male','landline','11','972839087',true,'${customer.password}','${customer.addresses[0].id}','${customer.addresses[0].id}');`;
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

export async function createDemoAdmin() {
  const customer: Customer = {
    isAdmin: true,
    id: "0c63db91-5b6f-4da7-854f-9fc3e2769948",
    name: "Pedro Samuel Davi Santos",
    email: "pedrosamuelsantos@sabereler.com.br",
    cpf: "39820645115",
    password: "XxQQ91Wep0",
    addresses: [
      {
        id: "93dbd005-1efa-4caa-88c7-cf056be5e8b1",
        nickname: "Casa",
        street: "Rio Tarumã",
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
      },
    ],
  };

  const createAddress = `INSERT INTO "address"("id","houseType","streetType","nickname","street","number","district","zipCode","city","state","country","active", "customerId") VALUES('${customer.addresses[0].id}','house','street','Casa','${customer.addresses[0].street}','18','Jardim Brasil','08633138','Suzano','São Paulo','Brasil',true, NULL);`;
  const createCustomerSql = `INSERT INTO "customer"("id","email","name","cpf","dateOfBirth","gender","phoneType","phoneAreaCode","phoneNumber","isActive","password","deliveryAddressId","billingAddressId", "isAdmin") VALUES('${customer.id}', '${customer.email}','${customer.name}','${customer.cpf}','2003-05-29 21:00:00','male','landline','11','972839087',true,'${customer.password}','${customer.addresses[0].id}','${customer.addresses[0].id}', TRUE);`;
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
export async function down() {
  const downAddressRelation = `UPDATE "address" SET "customerId"=NULL`;

  const dbConnection = getDbConn();
  await dbConnection.connect();
  await dbConnection.query(downAddressRelation);
  await dbConnection.query('DELETE FROM "card"');
  await dbConnection.query('DELETE FROM "customer"');
  await dbConnection.query('DELETE FROM "address"');
  await dbConnection.end();
  return null;
}
