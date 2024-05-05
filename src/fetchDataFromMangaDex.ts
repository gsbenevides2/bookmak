import OpenAPIClientAxios, { type Document } from "openapi-client-axios";
import { type Client } from "./openapi";
import LowDb, {
  type Book,
  type Author,
  type Category,
  type Volume,
} from "./lowdb";
import definition from "./openapi.json";
import booksId from "./books";
import { faker } from "@faker-js/faker";

const api = new OpenAPIClientAxios({
  definition: definition as Document,
  baseURLVariables: {
    baseUrl: "https://api.mangadex.org",
  },
});

async function getBook(id: string): Promise<Book> {
  const client = await api.getClient<Client>();
  const result = await client["get-manga-id"]({
    "includes[]": ["artist", "author", "cover_art"],
    id,
  });
  const title = result.data.data?.attributes?.title?.en;
  if (title == null) {
    throw new Error("Title not found");
  }
  const fileName = result.data.data?.relationships?.find(
    (r) => r.type === "cover_art",
  )?.attributes?.fileName as string | undefined;

  if (fileName == null) {
    throw new Error("Cover not found");
  }

  const cover = `https://uploads.mangadex.org/covers/${id}/${fileName}`;

  const description = result.data.data?.attributes?.description?.en;

  if (description == null) {
    throw new Error("Description not found");
  }

  const authors: Author[] =
    (result.data.data?.relationships
      ?.filter((r) => r.type === "author" || r.type === "artist")
      .map((r) => {
        const id = r.id;
        const name = r.attributes?.name;

        if (id == null || name == null) {
          return undefined;
        }
        return { id, name };
      })
      .filter((author) => author != null) as Author[]) ?? [];

  const categoriesFilter = result.data.data?.attributes?.tags?.filter(
    (tag) => tag.attributes?.group === "genre",
  );
  const categoriesPromise = categoriesFilter?.map(async (tag) => {
    const id = tag.id;
    const name = tag.attributes?.name?.en;
    if (id == null || name == null) {
      return undefined;
    }

    return { id, name };
  });
  const categoriesNotFilted = (await Promise.all(
    categoriesPromise ?? [],
  )) as Category[];
  const categories = categoriesNotFilted.filter((category) => category != null);

  const result2 = await client["get-cover"]({
    "manga[]": [id],
    order: {
      volume: "asc",
    },
    limit: 100,
    offset: 0,
  });

  const volumes: Volume[] = result2?.data?.data
    ?.filter((cover) => cover.attributes?.locale === "ja")
    ?.map((cover) => {
      const skuId = cover.id;
      const fileName = cover.attributes?.fileName;
      const volume = cover.attributes?.volume;
      if (volume == null || fileName == null || id == null) {
        return undefined;
      }

      const skuCover = `https://mangadex.org/covers/${id}/${fileName}`;
      const price = faker.number.int({ min: 1000, max: 10000 });
      const stockQuantity = faker.number.int({ min: 0, max: 100 });
      return {
        id: skuId,
        number: parseFloat(volume),
        cover: skuCover,
        price,
        stockQuantity,
        description,
      };
    })
    .filter((sku) => sku != null) as Volume[];

  return {
    id,
    title,
    cover,
    description,
    authors,
    categories,
    volumes,
  };
}

export async function syncronizeDataFromMangaDex(): Promise<void> {
  console.log("Syncronizing data from MangaDex");
  const db = LowDb.getInstance();
  for (const id of booksId) {
    console.log(`Syncronizing book ${id}`);
    const bookExists = db.bookExists(id);
    if (bookExists) {
      console.log(`Book ${id} already exists`);
      continue;
    }
    const book = await getBook(id);
    console.log(`Adding book ${id} - ${book.title} to database`);
    db.addBook(book);
  }
  console.log("Data syncronized.");
}
