import * as address from "./address";
import * as customer from "./customer";
import * as card from "./card";
import * as book from "./book";
import * as order from "./order";
import { downDatabase } from "./downDatabase";

export default {
  ...address,
  ...customer,
  ...card,
  ...book,
  ...order,
  downDatabase,
};
