/* eslint-disable @typescript-eslint/no-unused-vars */
import { Storage } from "@google-cloud/storage";
import { getServiceAccountPath } from "./serviceAccount";
import LowDb from "../lowdb";
import axios from "axios";
import cliProgress from "cli-progress";
async function downloadImage(imageUrl: string): Promise<Buffer> {
  const response = await axios.get<ArrayBuffer>(imageUrl, {
    responseType: "arraybuffer",
  });
  return Buffer.from(response.data);
}

export async function uploadCovers(): Promise<void> {
  console.log("Uploading covers to GCP");
  const serviceAccountPath = getServiceAccountPath();
  const storage = new Storage({
    keyFile: serviceAccountPath,
  });
  const buketName = "bookmak";
  const bucket = storage.bucket(buketName);
  const folderName = "public_statics";
  const imagesUrl = LowDb.getInstance().listAllImagesUrls();
  const publicUrls = [];
  // eslint-disable-next-line no-unreachable-loop
  const progressBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic,
  );
  progressBar.start(imagesUrl.length, 0);
  for (const imageUrl of imagesUrl) {
    if (imageUrl.includes("storage.googleapis.com")) {
      progressBar.increment();
      continue;
    }
    progressBar.increment();

    const fileName = imageUrl.split("/").pop();

    const fileDefault = bucket.file(`${folderName}/${fileName}`);
    const fileSizeOne = bucket.file(`${folderName}/${fileName}.256.jpg`);
    const fileSizeTwo = bucket.file(`${folderName}/${fileName}.512.jpg`);
    const [fileDefaultExists] = await fileDefault.exists();
    const [fileSizeOneExists] = await fileSizeOne.exists();
    const [fileSizeTwoExists] = await fileSizeTwo.exists();
    const uploads = [];

    if (!fileDefaultExists) {
      console.log(`Uploading ${fileName}`);
      uploads.push(fileDefault.save(await downloadImage(imageUrl)));
    }
    if (!fileSizeOneExists) {
      console.log(`Uploading ${fileName}.256.jpg`);
      uploads.push(
        fileSizeOne.save(await downloadImage(`${imageUrl}.256.jpg`)),
      );
    }
    if (!fileSizeTwoExists) {
      console.log(`Uploading ${fileName}.512.jpg`);
      uploads.push(
        fileSizeTwo.save(await downloadImage(`${imageUrl}.512.jpg`)),
      );
    }
    await Promise.all(uploads);

    const promises = [
      fileDefault.makePublic(),
      fileSizeOne.makePublic(),
      fileSizeTwo.makePublic(),
    ];
    await Promise.all(promises);
    const newUrl = fileDefault.publicUrl();
    publicUrls.push({
      newUrl,
      oldUrl: imageUrl,
    });
  }
  progressBar.stop();
  LowDb.getInstance().updateImagesUrls(publicUrls);
  console.log("Covers uploaded to GCP");
}
