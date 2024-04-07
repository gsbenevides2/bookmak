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
accountsRouter.get("/me/orders", AccountsController.getMyOrdersController);

accountsRouter.get("/me/orders/:orderId", AccountsController.getDataFromOrder);

accountsRouter.get("/me/orders/:orderId/change", (req, res) => {
  res.render("accounts/changeOrder", {
    orderId: req.params.orderId,
  });
});
accountsRouter.get("/me/orders/1/cancel", (_req, res) => {
  res.render("accounts/cancelOrder");
});
accountsRouter.post(
  "/me/orders/:orderId/change",
  AccountsController.exchangeOrderController,
);

accountsRouter.get("/me/cupons", AccountsController.getMyCuponsController);

export default accountsRouter;
