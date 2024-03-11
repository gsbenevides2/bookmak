import { faker } from "@faker-js/faker";
import { MockResponses } from "../mocks/mock";
import { type Controller } from "../types/controller";

export const getLogInPageController: Controller = (req, res) => {
  const { redirectTo } = req.query;
  if (req.cookies.accountId == null) {
    res.render("login/login", { error: null, redirectTo });
  } else {
    const account = MockResponses.accounts.find(
      (account) => account.id === req.cookies.accountId,
    );
    if (account == null) {
      res.cookie("accountId", "", { maxAge: 0 });
      res.render("login/login", { error: "Sua sessão expirou", redirectTo });
      return;
    }

    if (redirectTo?.length != null) {
      res.redirect(redirectTo as string);
      return;
    }
    res.redirect("/accounts/me");
  }
};

export const logInController: Controller = (req, res) => {
  const { email, password } = req.body;
  const { redirectTo } = req.query;
  const account = MockResponses.accounts.find(
    (account) => account.email === email && account.password === password,
  );
  if (account != null) {
    res.cookie("accountId", account.id);
    if (redirectTo?.length != null) {
      res.redirect(redirectTo as string);
      return;
    }
    res.redirect("/accounts/me");
  } else {
    res.render("login/login", {
      error: "Senha ou nome de usuário incorretos",
    });
  }
};

export const logOutController: Controller = (_req, res) => {
  res.clearCookie("accountId");
  res.redirect("/");
};

export const registerController: Controller = (req, res) => {
  const { name, email, password, cpf, dateOfBirth } = req.body;
  const account = MockResponses.accounts.find(
    (account) => account.email === email,
  );
  if (account != null) {
    res.render("login/register", {
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
    birthdate: new Date(dateOfBirth as string),
    isAdmin: false,
  });
  res.cookie("accountId", id);
  if (req.query.redirectTo?.length != null) {
    res.redirect(req.query.redirectTo as string);
    return;
  }
  res.redirect("/accounts/me");
};
