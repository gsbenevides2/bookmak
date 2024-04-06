import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import * as checkoutController from "../controllers/checkout";

const checkoutRouter = Router();

checkoutRouter.get("/cart", checkoutController.getCart);
checkoutRouter.post("/cart", checkoutController.updateCart);

checkoutRouter.get(
  "/bookmark",
  authMiddleware,
  checkoutController.getAvailableBokmarkTexts,
);
checkoutRouter.post(
  "/bookmark",
  authMiddleware,
  checkoutController.updateBookmarkTextInOrder,
);

checkoutRouter.get(
  "/addresses",
  authMiddleware,
  checkoutController.getAddressSettigsForCurrentOrder,
);
checkoutRouter.post(
  "/addresses",
  authMiddleware,
  checkoutController.updateAddressSettingsForCurrentOrder,
);

checkoutRouter.get(
  "/payment",
  authMiddleware,
  checkoutController.getAllDataForCheckout,
);
checkoutRouter.post(
  "/payment",
  authMiddleware,
  checkoutController.finishCheckout,
);

export default checkoutRouter;
