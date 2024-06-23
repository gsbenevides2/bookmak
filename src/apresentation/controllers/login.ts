import { Customer } from "../../business/models/Customer";
import registerCustomer from "../../business/useCases/customer/registerCustomer";
import { DatabaseConnection } from "../../persistence/dbConnection";
import { comparePassword } from "../../utils/password";
import { type Controller } from "./types";

export const getLogInPage: Controller = (req, res) => {
  const handles = async (): Promise<void> => {
    const { redirectTo, error } = req.query;
    if (req.session.accountId == null) {
      res.render("login/login", { error, redirectTo });
    } else {
      const dataSource = await DatabaseConnection.getDataSource();
      const customerRepository = dataSource.getRepository(Customer);
      const account = await customerRepository.findOne({
        where: { id: req.session.accountId },
      });
      if (account == null || error != null) {
        req.session.accountId = undefined;
        req.session.save();
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
  handles().catch((error) => {
    console.error("Error getting login page", error);
    res.status(500).send("Internal server error");
  });
};

export const logIn: Controller = (req, res) => {
  const handler = async (): Promise<void> => {
    const { email, password } = req.body;
    const { redirectTo } = req.query;
    const dataSource = await DatabaseConnection.getDataSource();

    const account = await dataSource.getRepository(Customer).findOne({
      where: {
        email,
        isActive: true,
      },
      select: ["id", "passwordHash"],
    });

    if (account != null) {
      const passwordMatch = await comparePassword(
        password,
        account.passwordHash,
      );
      if (passwordMatch === false) {
        res.render("login/login", {
          error: "Senha ou nome de usuário incorretos. Ou conta inativa.",
          redirectTo,
        });
        return;
      }

      req.session.accountId = account.id;
      req.session.save();
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

export const logOut: Controller = (req, res) => {
  req.session.accountId = undefined;
  req.session.save();
  res.redirect("/");
};

export const register: Controller = (req, res) => {
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
      req.session.accountId = userId;
      req.session.save();
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
