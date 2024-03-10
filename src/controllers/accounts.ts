import { faker } from "@faker-js/faker";
import { type Controller } from "../types/controller";

interface UserData {
  admin: boolean;
  name: string;
  email: string;
}

export const getMyAccountController: Controller = (req, res) => {
  const accountIdCookie = req.cookies?.accountId;
  if (accountIdCookie == null) {
    res.redirect("/login");
  } else {
    const user: UserData = {
      admin: faker.datatype.boolean(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
    };
    res.render("account", { user });
  }
};
