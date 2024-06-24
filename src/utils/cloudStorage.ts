import { Storage } from "@google-cloud/storage";
import "dotenv/config";
import UUID from "uuid";

export async function uploadToGCP(filePath: string): Promise<string> {
  const storage = new Storage({
    keyFilename: process.env.GCP_SERVICE_ACCOUNT_KEY_PATH,
  });
  const bucketName = "bookmak";
  const bucket = storage.bucket(bucketName);
  const folderName = "public_statics";
  const fileName = UUID.v4();
  const fileDefault = bucket.file(`${folderName}/${fileName}`);
  const fileSizeOne = bucket.file(`${folderName}/${fileName}.256.jpg`);
  const fileSizeTwo = bucket.file(`${folderName}/${fileName}.512.jpg`);
  const promises = [
    fileDefault.save(filePath),
    fileSizeOne.save(filePath),
    fileSizeTwo.save(filePath),
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
