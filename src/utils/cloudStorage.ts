import { Storage } from "@google-cloud/storage";
import "dotenv/config";
import fs from "fs";
import Jimp from "jimp";
import { v4 } from "uuid";
async function loadFileToBuffer(filePath: string): Promise<Buffer> {
  const fsRes = await fs.promises.readFile(filePath);
  return fsRes;
}
const storage = new Storage({
  keyFilename: process.env.GCP_SERVICE_ACCOUNT_KEY_PATH,
});
const bucket = storage.bucket("bookmak");
void bucket.setCorsConfiguration([
  {
    maxAgeSeconds: 3600,
    method: ["GET", "HEAD", "PUT", "POST", "DELETE"],
    origin: ["*"],
    responseHeader: ["*"],
  },
]);

export async function uploadBookCover(
  filePath: string,
  fileType: "png" | "jpg",
): Promise<string> {
  const folderName = "public_statics";

  const fileName = v4() + "." + fileType;
  const fileDefault = bucket.file(`${folderName}/${fileName}`);
  const fileSizeOne = bucket.file(`${folderName}/${fileName}.256.jpg`);
  const fileSizeTwo = bucket.file(`${folderName}/${fileName}.512.jpg`);
  const fileBuffer = await loadFileToBuffer(filePath);

  const jimpImage = await Jimp.read(fileBuffer);
  const resizedImageOne = await jimpImage
    .resize(256, Jimp.AUTO)
    .getBufferAsync(Jimp.MIME_JPEG);
  const resizedImageTwo = await jimpImage
    .resize(512, Jimp.AUTO)
    .getBufferAsync(Jimp.MIME_JPEG);

  const promises = [
    fileDefault.save(fileBuffer),
    fileSizeOne.save(resizedImageOne),
    fileSizeTwo.save(resizedImageTwo),
  ];

  await Promise.all(promises);

  const makePublicPromises = [
    fileDefault.makePublic(),
    fileSizeOne.makePublic(),
    fileSizeTwo.makePublic(),
  ];

  await Promise.all(makePublicPromises);

  return fileDefault.publicUrl();
}

export async function uploadBookmark(
  filePath: string,
  fileType: "png" | "jpg",
): Promise<string> {
  const folderName = "public_statics";

  const fileName = v4() + "." + fileType;
  const fileDefault = bucket.file(`${folderName}/${fileName}`);

  const fileBuffer = await loadFileToBuffer(filePath);
  await fileDefault.save(fileBuffer);
  await fileDefault.makePublic();

  return fileDefault.publicUrl();
}
