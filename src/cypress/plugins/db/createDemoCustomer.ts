import pg from "pg";
import { config } from "dotenv";
import path from "path";

export async function createDemoCustommerUp() {
  const addressId = "ac6ed37c-879f-4d12-907b-3006bbdc5081";
  const customerId = "dfd05c29-ca9e-4f06-8cea-72285bcdd5a6";
  const cardId = "afbebd82-4398-4409-9344-aeed289e896f";
  const email = "gsbenevides2@gmail.com";
  const password = "SenhaFraca123";
  const createCustomerSql = `INSERT INTO "customer"("id","email","name","cpf","dateOfBirth","gender","phoneType","phoneAreaCode","phoneNumber","isActive","password","deliveryAddressId","billingAddressId") VALUES('${customerId}', '${email}','Guilherme da Silva Benevides','56840932800','2003-05-29 21:00:00','male','landline','11','972839087',true,'${password}',NULL,NULL);`;
  const createAddress = `INSERT INTO "address"("id","houseType","streetType","nickname","street","number","district","zipCode","city","state","country","active","customerId") VALUES('${addressId}','house','street','Casa','Cinco','18','Jardim Brasil','08633138','Suzano','São Paulo','Brasil',true,'${customerId}');`;
  const createCard = `INSERT INTO "card"("id","number","holderName","flag","cvv","monthOfValidity","yearOfValidity","active","customerId") VALUES('${cardId}','5376 9969 8920 7547','Guilherme Benevides','Visa','362','10','2025',true,'${customerId}');`;
  const updateAddressForCustomer = `UPDATE "customer" SET "deliveryAddressId"='${addressId}', "billingAddressId"='${addressId}' WHERE id='${customerId}'`;

  const dbCredentials = config({
    path: path.resolve(process.cwd(), "..", "..", ".env.test"),
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
  await dbConnection.connect();
  await dbConnection.query(createCustomerSql);
  await dbConnection.query(createAddress);
  await dbConnection.query(createCard);
  await dbConnection.query(updateAddressForCustomer);
  await dbConnection.end();
  return {
    email,
    password,
  };
}
export async function createDemoCustommerDown() {
  const downAddressRelation = `UPDATE "customer" SET "deliveryAddressId"=NULL, "billingAddressId"=NULL`;

  const dbCredentials = config({
    path: path.resolve(process.cwd(), "..", "..", ".env.test"),
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
  await dbConnection.connect();
  await dbConnection.query(downAddressRelation);
  await dbConnection.query('DELETE FROM "address"');
  await dbConnection.query('DELETE FROM "card"');
  await dbConnection.query('DELETE FROM "customer"');
  await dbConnection.end();
  return null;
}
