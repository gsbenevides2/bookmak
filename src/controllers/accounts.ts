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
    res.render("accounts/account", { user });
  }
};

export const changeMyAccountDataController: Controller = (req, res) => {
  const accountIdCookie = req.cookies?.accountId;
  const { name, email, cpf, dateOfBirth } = req.body;
  const index = MockResponses.accounts.findIndex(
    (account) => account.id === accountIdCookie,
  );
  if (index === -1) {
    res.redirect("/login");
    return;
  }
  MockResponses.accounts[index] = {
    ...MockResponses.accounts[index],
    name,
    email,
    cpf,
    birthdate: new Date(dateOfBirth as string),
  };
  res.redirect("/accounts/me");
};

export const deleteAddressController: Controller = (req, res) => {
  const id = req.params.id;
  const index = MockResponses.addresses.findIndex(
    (address) => address.id === id,
  );
  if (index === -1) {
    res.redirect("/accounts/me/addresses");
    return;
  }
  MockResponses.addresses.splice(index, 1);
  res.redirect("/accounts/me/addresses");
};

export const newAddressController: Controller = (req, res) => {
  const {
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
  } = req.body;
  const newAddress = {
    id: Math.random().toString(36).substring(7),
    addressName,
    residenceType,
    streetType,
    street,
    number,
    district,
    zip,
    city,
    state,
    country,
  };

  MockResponses.addresses.push(newAddress);
  res.redirect("/accounts/me/addresses");
};

export const newCardController: Controller = (req, res) => {
  const {
    cardNumber,
    cardName,
    cardExpiration,
    cardCVV,
    cardBrand,
    cardExpiry,
  } = req.body;
  const newCard = {
    id: Math.random().toString(36).substring(7),
    cardNumber,
    cardName,
    cardExpiration,
    cardCVV,
    cardBrand,
    cardExpiry: cardExpiry.split("-").reverse().join("/"),
  };

  MockResponses.cards.push(newCard);
  res.redirect("/accounts/me/cards");
};
export const deleteCardController: Controller = (req, res) => {
  const id = req.params.id;
  const index = MockResponses.cards.findIndex((card) => card.id === id);
  if (index === -1) {
    res.redirect("/accounts/me/cards");
    return;
  }
  MockResponses.cards.splice(index, 1);
  res.redirect("/accounts/me/cards");
};
