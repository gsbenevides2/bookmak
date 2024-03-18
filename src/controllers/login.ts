import { DatabaseConnection } from "../dbConnection";
import { MockResponses } from "../mocks/mock";
import { Customer } from "../models/Customer";
import { type Controller } from "../types/controller";
import registerCustomer from "../useCases/customer/registerCustomer";

export const getLogInPageController: Controller = (req, res) => {
  const { redirectTo, error } = req.query;
  if (req.cookies.accountId == null) {
    res.render("login/login", { error, redirectTo });
  } else {
    const account = MockResponses.accounts.find(
      (account) => account.id === req.cookies.accountId,
    );
    if (account == null || error != null) {
      res.cookie("accountId", "", { maxAge: 0 });
      res.render("login/login", {
        error: error ?? "Sua sessão expirou",
        redirectTo,
      });
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
  const handler = async (): Promise<void> => {
    const { email, password } = req.body;
    const { redirectTo } = req.query;
    const dataSource = await DatabaseConnection.getDataSource();

    const account = await dataSource.getRepository(Customer).findOne({
      where: {
        email,
        password,
        isActive: true,
      },
      select: ["id"],
    });
    console.log(account);

    if (account != null) {
      res.cookie("accountId", account.id);
      if (redirectTo?.length != null) {
        res.redirect(redirectTo as string);
        return;
      }
      res.redirect("/accounts/me");
    } else {
      res.render("login/login", {
        error: "Senha ou nome de usuário incorretos. Ou conta inativa.",
        redirectTo,
      });
    }
  };
  void handler();
};

export const logOutController: Controller = (_req, res) => {
  res.clearCookie("accountId");
  res.redirect("/");
};

export const registerController: Controller = (req, res) => {
  const {
    name,
    email,
    password,
    cpf,
    dateOfBirth,
    gender,
    phoneAreaCode,
    phoneNumber,
    phoneType,
    // Address
    street,
    number,
    city,
    state,
    zip,
    district,
    country,
    addressName,
    residenceType,
    streetType,
    observations,
  } = req.body;

  registerCustomer({
    gender,
    phoneAreaCode,
    phoneNumber,
    phoneType,
    name,
    email,
    cpf,
    dateOfBirth,
    password,
    // Address
    city,
    country,
    district,
    houseType: residenceType,
    nickname: addressName,
    number,
    observations,
    state,
    street,
    streetType,
    zipCode: zip,
  })
    .then((userId) => {
      res.cookie("accountId", userId);
      if (req.query.redirectTo?.length != null) {
        res.redirect(req.query.redirectTo as string);
        return;
      }
      res.redirect("/accounts/me");
    })
    .catch((error) => {
      res.render("login/register", {
        error: error.message,
      });
    });
};
