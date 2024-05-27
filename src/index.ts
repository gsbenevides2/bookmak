import "dotenv/config";

import syncBookmarks from "./bookmarks";
import { syncronizeBooks } from "./database";
import { syncronizeDataFromMangaDex } from "./fetchDataFromMangaDex";
import { uploadCovers } from "./gcp/storage";
import { syncronizeTranslations } from "./gcp/translate";

async function main(): Promise<void> {
  await syncronizeDataFromMangaDex();
  await syncronizeTranslations();
  await uploadCovers();
  syncBookmarks();
  await syncronizeBooks();
}

void main();
