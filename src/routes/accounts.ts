import { Router } from "express";
import * as AccountsController from "../controllers/accounts";
import { MockResponses } from "../mocks/mock";

const accountsRouter = Router();

accountsRouter.get("/me", AccountsController.getMyAccountController);
accountsRouter.post("/me", AccountsController.changeMyAccountDataController);

accountsRouter.get("/me/addresses", (_req, res) => {
  res.render("accounts/addresses", {
    error: null,
    addresses: MockResponses.addresses,
  });
});
accountsRouter.get("/me/addresses/new", (req, res) => {
  res.render("accounts/newAddress", { error: null });
});
accountsRouter.post(
  "/me/addresses/:id/delete",
  AccountsController.deleteAddressController,
);
accountsRouter.post(
  "/me/addresses/new",
  AccountsController.newAddressController,
);

accountsRouter.get("/me/cards", (_req, res) => {
  res.render("accounts/cards", {
    error: null,
    cards: MockResponses.cards,
  });
});
accountsRouter.get("/me/cards/new", (_req, res) => {
  res.render("accounts/newCard", { error: null });
});
accountsRouter.post(
  "/me/cards/:id/delete",
  AccountsController.deleteCardController,
);
accountsRouter.post("/me/cards/new", AccountsController.newCardController);

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

export default accountsRouter;
