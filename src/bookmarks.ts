import LowDb from "./lowdb";

const bookmarksUrls = {
  "9bbb9e67-aaf7-4c24-a24e-942f036996dd":
    "https://storage.googleapis.com/bookmak/bookmarks/Kaguya%20Sama.png",
  "30f3ac69-21b6-45ad-a110-d011b7aaadaa":
    "https://storage.googleapis.com/bookmak/bookmarks/Tonikaku%20Kawai.png",
  "32fdfe9b-6e11-4a13-9e36-dcd8ea77b4e4":
    "https://storage.googleapis.com/bookmak/bookmarks/Rent.png",
  "c8aebcc7-678e-4682-a727-48febbc325fd":
    "https://storage.googleapis.com/bookmak/bookmarks/Eight%20Six.png",
  "f8fed9b2-546f-446f-bd3f-3c7192019774":
    "https://storage.googleapis.com/bookmak/bookmarks/Nazo%20no%20Kanojo.png",
  "2e0fdb3b-632c-4f8f-a311-5b56952db647":
    "https://storage.googleapis.com/bookmak/bookmarks/Bochi%20The%20Rock.png",
};

export default function syncBookmarks(): void {
  console.log("Syncing bookmarks...");
  const dbInstance = LowDb.getInstance();
  for (const id in bookmarksUrls) {
    const url = bookmarksUrls[id as keyof typeof bookmarksUrls];
    if (!dbInstance.bookExists(id)) {
      continue;
    }
    const book = dbInstance.findBookById(id);
    if (book != null) {
      book.bookmarkStyle = url;
      dbInstance.bookUpdate(book);
    }
  }
  console.log("Bookmarks synced!");
}
