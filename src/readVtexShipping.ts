import xlsx from "node-xlsx";
import path from "path";
import { saveShipping } from "./database";
export interface ShippingToDB {
  zipCodeStart: string;
  zipCodeEnd: string;
  weightStart: number;
  weightEnd: number;
  absoluteMoneyCost: number;
  pricePercentage: number;
  priceByWeight: number;
}
export async function readVtexShipping(): Promise<void> {
  const worksheetPath = path.resolve(__dirname, "../frete.xls");
  console.log("Reading file", worksheetPath);
  const worksheet = xlsx.parse(worksheetPath);
  console.log("File readed");
  const qtdOfSheets = worksheet.length;
  console.log("Processing", qtdOfSheets, "sheets");

  for (let i = 0; i < qtdOfSheets; i++) {
    const sheet = worksheet[i];
    const rowsQty = sheet.data.length;
    console.log("Processing sheet", i, "with", rowsQty, "rows");
    const shippingDataToDB = sheet.data.slice(1).map((row) => ({
      zipCodeStart: row[0],
      zipCodeEnd: row[1],
      weightStart: row[3],
      weightEnd: row[4],
      absoluteMoneyCost: parseInt((row[5] * 100).toFixed(0)),
      pricePercentage: row[6],
      priceByWeight: parseInt((row[7] * 100).toFixed(0)),
    }));

    console.log("Saving", shippingDataToDB.length, "rows");
    let saved = 0;
    for (const shipping of shippingDataToDB) {
      await saveShipping(shipping);
      console.log("Saved", ++saved, "of", shippingDataToDB.length);
    }
  }
}

void readVtexShipping();
