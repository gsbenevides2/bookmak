import { Router } from "express";
import { MockResponses } from "../mocks/mock";
import { faker } from "@faker-js/faker";

const loginRouter = Router();

loginRouter.get("/", (req, res) => {
  const { goToCheckout } = req.query;
  if (req.cookies.accountId == null) {
    res.render("login", { error: null, goToCheckout });
  } else {
    const account = MockResponses.accounts.find(
      (account) => account.id === req.cookies.accountId,
    );
    if (account == null) {
      res.cookie("accountId", "", { maxAge: 0 });
      res.render("login", { error: "Sua sessão expirou", goToCheckout });
      return;
    }

    if (goToCheckout === "true") {
      res.redirect("/checkout/address");
      return;
    }
    res.redirect("/accounts/me");
  }
});

loginRouter.post("/", (req, res) => {
  const { email, password } = req.body;
  const { goToCheckout } = req.query;
  const account = MockResponses.accounts.find(
    (account) => account.email === email && account.password === password,
  );
  if (account != null) {
    res.cookie("accountId", account.id);
    if (goToCheckout === "true") {
      res.redirect("/checkout/address");
      return;
    }
    res.redirect("/accounts/me");
  } else {
    res.render("login", {
      error: "Senha ou nome de usuário incorretos",
    });
  }
});

loginRouter.get("/logout", (_req, res) => {
  res.clearCookie("accountId");
  res.redirect("/");
});

loginRouter.get("/register", (_req, res) => {
  res.render("register", { error: null });
});

loginRouter.post("/register", (req, res) => {
  const { name, email, password, cpf, dateOfBirth } = req.body;
  const account = MockResponses.accounts.find(
    (account) => account.email === email,
  );
  if (account != null) {
    res.render("register", {
      error: "Já existe uma conta com esse email",
    });
    return;
  }
  const id = faker.string.uuid();
  MockResponses.accounts.push({
    id,
    name,
    email,
    password,
    cpf,
    birthdate: new Date(dateOfBirth),
    isAdmin: false,
  });
  res.cookie("accountId", id);
  if (req.query.goToCheckout === "true") {
    res.redirect("/checkout/address");
    return;
  }
  res.redirect("/accounts/me");
});

export default loginRouter;
