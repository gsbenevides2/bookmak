import axios from "axios";
import "dotenv/config";
import LowDb, { type Category, type Book } from "../lowdb";
import { getServiceAccount, retriveAccessToken } from "./serviceAccount";

export async function translateText(
  text: string,
  sourceLanguageCode: string,
): Promise<string | undefined> {
  const serviceAccount = getServiceAccount();
  const projectId = serviceAccount.project_id;
  const accessToken = await retriveAccessToken(serviceAccount);

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
