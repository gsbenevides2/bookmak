import axios from "axios";
import { readJsonFile } from "./readJsonFile";
import jwt from "jsonwebtoken";
import "dotenv/config";
import LowDb, { type Category, type Book } from "./lowdb";

export interface ServiceAccount {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

export async function translateText(
  text: string,
  sourceLanguageCode: string,
): Promise<string | undefined> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const creds = process.env.GOOGLE_APPLICATION_CREDENTIALS!;
  const serviceAccount = readJsonFile<ServiceAccount>(creds);
  const projectId = serviceAccount.project_id;
  const token = jwt.sign(
    {
      iss: serviceAccount.client_email,
      scope: "https://www.googleapis.com/auth/cloud-platform",
      aud: "https://oauth2.googleapis.com/token",
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000),
    },
    serviceAccount.private_key,
    {
      algorithm: "RS256",
    },
  );

  const accessTokenResponse = await axios.post(
    `https://oauth2.googleapis.com/token`,
    {
      client_id: serviceAccount.client_id,
      client_secret: serviceAccount.private_key,
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: token,
    },
  );
  const accessToken = accessTokenResponse.data.access_token;

  const api = axios.create({
    baseURL:
      "https://translation.googleapis.com/v3beta1/projects/" +
      projectId +
      "/locations/global:translateText",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  const response = await api.post("", {
    sourceLanguageCode,
    targetLanguageCode: "pt-br",
    contents: [text],
    mime_type: "text/plain",
  });

  return response.data.translations?.[0].translatedText;
}

export async function translateCategory(category: Category): Promise<Category> {
  if (category.translatedName != null) return category;
  return await translateText(category.name, "en").then((translatedName) => ({
    ...category,
    translatedName,
  }));
}

export async function translateAllCategories(
  categories: Category[],
): Promise<Category[]> {
  return await Promise.all(
    categories.map(async (category) => await translateCategory(category)),
  );
}

export async function trasnlateBook(
  book: Book,
  translatedCategories: Category[],
): Promise<Book> {
  const newBook = {
    ...book,
  };
  if (newBook.translatedDescription == null) {
    const translatedDescription = await translateText(book.description, "en");
    newBook.translatedDescription = translatedDescription;
  }
  const newCategories = book.categories.map((category) => {
    const translatedCategory = translatedCategories.find(
      (c) => c.id === category.id,
    );
    const translatedName = translatedCategory?.translatedName;
    return {
      ...category,
      translatedName,
    };
  });
  newBook.categories = newCategories;
  return newBook;
}

export async function syncronizeTranslations(): Promise<void> {
  console.log("Syncronizing translations");
  const categories = LowDb.getInstance().fethAllCategories();
  const translatedCategories = await translateAllCategories(categories);
  const books = LowDb.getInstance().fetchAllBooks();
  const translatedBooks = await Promise.all(
    books.map(async (book) => await trasnlateBook(book, translatedCategories)),
  );
  translatedBooks.forEach((book) => {
    LowDb.getInstance().bookUpdate(book);
  });
  console.log("Translations syncronized");
}
