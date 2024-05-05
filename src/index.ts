import { syncronizeBooks } from "./database";
import { syncronizeDataFromMangaDex } from "./fetchDataFromMangaDex";
import { syncronizeTranslations } from "./translate";

async function main(): Promise<void> {
  await syncronizeDataFromMangaDex();
  await syncronizeTranslations();
  await syncronizeBooks();
}

void main();
