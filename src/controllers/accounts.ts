import { type Controller } from "../types/controller";
import { MockResponses } from "../mocks/mock";

interface UserData {
  admin: boolean;
  name: string;
  email: string;
  cpf: string;
  dateOfBirth: string;
}

export const getMyAccountController: Controller = (req, res) => {
  const accountIdCookie = req.cookies?.accountId;
  const account = MockResponses.accounts.find(
    (account) => account.id === accountIdCookie,
  );

  if (account == null) {
    res.redirect("/login");
  } else {
    const user: UserData = {
      admin: account.isAdmin,
      email: account.email,
      name: account.name,
      cpf: account.cpf,
      dateOfBirth: account.birthdate.toISOString().split("T")[0],
    };
    res.render("account", { user });
  }
};
