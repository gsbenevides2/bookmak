import { DatabaseConnection } from "../dbConnection";
import { Customer } from "../models/Customer";
import { type Controller } from "../types/controller";
import registerCustomer from "../useCases/customer/registerCustomer";

// eslint-disable-next-line @typescript-eslint/no-misused-promises
export const getLogInPageController: Controller = async (req, res) => {
  const { redirectTo, error } = req.query;
  if (req.cookies.accountId == null) {
    res.render("login/login", { error, redirectTo });
  } else {
    const dataSource = await DatabaseConnection.getDataSource();
    const customerRepository = dataSource.getRepository(Customer);
    const account = await customerRepository.findOne({
      where: { id: req.cookies.accountId },
    });
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
  interface Body {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    cpf: string;
    dateOfBirth: string;
    gender: string;
    phoneAreaCode: string;
    phoneNumber: string;
    phoneType: string;
    // Address
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
    district: string;
    country: string;
    nickname: string;
    houseType: string;
    streetType: string;
    observations: string;
  }
  const body = req.body as Body;
  registerCustomer(body)
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
