import { Router } from "express";
import * as AccountsController from "../controllers/accounts";
import { authMiddleware } from "../middlewares/auth";

const accountsRouter = Router();

accountsRouter.use(authMiddleware);

// Personal data
accountsRouter.get("/me", AccountsController.getMyAccount);
accountsRouter.post("/me", AccountsController.changeMyAccountData);
accountsRouter.get("/me/deactivate", AccountsController.deactivateMyAccount);
accountsRouter.get("/me/changePassword", (_req, res) => {
  res.render("accounts/changePassword", { error: null, success: null });
});
accountsRouter.post("/me/changePassword", AccountsController.changeMyPassword);
// Addresses
accountsRouter.get("/me/addresses", AccountsController.getAddresses);
accountsRouter.get("/me/addresses/new", (req, res) => {
  res.render("accounts/address", {});
});
accountsRouter.get("/me/addresses/edit/:id", AccountsController.getAddress);
accountsRouter.post("/me/addresses/edit/:id", AccountsController.editAddress);
accountsRouter.post(
  "/me/addresses/:id/delete",
  AccountsController.deleteAddress,
);
accountsRouter.post("/me/addresses/new", AccountsController.newAddress);
// Cards
accountsRouter.get("/me/cards", AccountsController.getCards);
accountsRouter.get("/me/cards/new", (_req, res) => {
  res.render("accounts/newCard", { error: null, success: null });
});
accountsRouter.post("/me/cards/:id/delete", AccountsController.deleteCard);
accountsRouter.post("/me/cards/new", AccountsController.newCard);

// Orders
accountsRouter.get("/me/orders", AccountsController.getMyOrders);

accountsRouter.get("/me/orders/:orderId", AccountsController.getDataFromOrder);

accountsRouter.get(
  "/me/orders/:orderId/change",
  AccountsController.checkOrderIsExchangeable,
);

accountsRouter.post(
  "/me/orders/:orderId/change",
  AccountsController.exchangeOrder,
);

accountsRouter.get("/me/coupons", AccountsController.getMyCupons);

accountsRouter.get(
  "/me/orders/:orderId/cancel",
  AccountsController.checkOrderIsCancelable,
);

accountsRouter.post(
  "/me/orders/:orderId/cancel",
  AccountsController.cancelOrder,
);

export default accountsRouter;
