import { Router } from "express";
import * as AccountsController from "../controllers/accounts";
import { authMiddleware } from "../middlewares/auth";

const accountsRouter = Router();

accountsRouter.use(authMiddleware);

// Personal data
accountsRouter.get("/me", AccountsController.getMyAccountController);
accountsRouter.post("/me", AccountsController.changeMyAccountDataController);
accountsRouter.get(
  "/me/deactivate",
  AccountsController.deactivateMyAccountController,
);
accountsRouter.get("/me/changePassword", (_req, res) => {
  res.render("accounts/changePassword", { error: null, success: null });
});
accountsRouter.post(
  "/me/changePassword",
  AccountsController.changeMyPasswordController,
);
// Addresses
accountsRouter.get("/me/addresses", AccountsController.getAddressesController);
accountsRouter.get("/me/addresses/new", (req, res) => {
  res.render("accounts/address", {});
});
accountsRouter.get(
  "/me/addresses/edit/:id",
  AccountsController.getAddressController,
);
accountsRouter.post(
  "/me/addresses/edit/:id",
  AccountsController.editAddressController,
);
accountsRouter.post(
  "/me/addresses/:id/delete",
  AccountsController.deleteAddressController,
);
accountsRouter.post(
  "/me/addresses/new",
  AccountsController.newAddressController,
);
// Cards
accountsRouter.get("/me/cards", AccountsController.getCardsController);
accountsRouter.get("/me/cards/new", (_req, res) => {
  res.render("accounts/newCard", { error: null, success: null });
});
accountsRouter.post(
  "/me/cards/:id/delete",
  AccountsController.deleteCardController,
);
accountsRouter.post("/me/cards/new", AccountsController.newCardController);

// Orders
accountsRouter.get("/me/orders", (_req, res) => {
  res.render("accounts/orders");
});

accountsRouter.get("/me/orders/1", (_req, res) => {
  res.render("accounts/order");
});

accountsRouter.get("/me/orders/1/change", (_req, res) => {
  res.render("accounts/changeOrder");
});
accountsRouter.get("/me/orders/1/cancel", (_req, res) => {
  res.render("accounts/cancelOrder");
});

accountsRouter.get("/me/cupons", AccountsController.getMyCuponsController);

export default accountsRouter;
