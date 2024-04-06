import { type Controller } from "../types/controller";
import { getCustomerData } from "../useCases/customer/getCustomerData";
import updateCustomerData from "../useCases/customer/updateCustomerData";
import { deactivateAccount } from "../useCases/customer/deactivateAccount";
import registerNewAddress from "../useCases/customer/registerNewAddress";
import getAddresses from "../useCases/customer/getAddresses";
import getAdddress from "../useCases/customer/getAddress";
import updateAddress from "../useCases/customer/updateAddress";
import removeAddress from "../useCases/customer/removeAddress";
import registerNewCard from "../useCases/customer/registerNewCard";
import { getCards } from "../useCases/customer/getCards";
import deleteCard from "../useCases/customer/deleteCard";
import changePassword from "../useCases/customer/changePassword";
import { MockResponses } from "../mocks/mock";

export const getMyAccountController: Controller = (req, res) => {
  const accountIdCookie = req.cookies?.accountId as string;
  getCustomerData(accountIdCookie)
    .then((account) => {
      if (account == null) {
        res.redirect("/login");
      } else {
        res.render("accounts/account", {
          account,
          success: req.query.success,
          error: req.query.error,
        });
      }
    })
    .catch(() => {
      res.redirect("/login?error=Erro ao buscar dados");
    });
};
export const changeMyAccountDataController: Controller = (req, res) => {
  const accountIdCookie = req.cookies?.accountId as string;
  interface Body {
    name: string;
    email: string;
    cpf: string;
    dateOfBirth: string;
    gender: string;
    phoneAreaCode: string;
    phoneNumber: string;
    phoneType: string;
    billingAddressId: string;
    deliveryAddressId: string;
  }
  updateCustomerData(accountIdCookie, req.body as Body)
    .then(() => {
      res.redirect("/accounts/me?success=Dados atualizados");
    })
    .catch((error) => {
      res.redirect(`/accounts/me?error=${error.message}`);
    });
};
export const deactivateMyAccountController: Controller = (req, res) => {
  const accountIdCookie = req.cookies?.accountId as string;
  deactivateAccount(accountIdCookie)
    .then(() => {
      res.clearCookie("accountId");
      res.redirect("/login?error=Conta desativada");
    })
    .catch(() => {
      res.redirect("/accounts/me?error=Erro ao desativar conta");
    });
};
export const changeMyPasswordController: Controller = (req, res) => {
  interface Body {
    password: string;
    newPassword: string;
    confirmPassword: string;
  }
  const body = req.body as Body;
  const accountIdCookie = req.cookies?.accountId as string;
  changePassword({
    accountId: accountIdCookie,
    newPassword: body.newPassword,
    oldPassword: body.password,
    passwordConfirm: body.confirmPassword,
  })
    .then(() => {
      res.redirect("/accounts/me?success=Senha alterada");
    })
    .catch((error) => {
      res.render("accounts/changePassword", {
        error: error.message,
      });
    });
};

export const newAddressController: Controller = (req, res) => {
  interface Body {
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
  const customerId = req.cookies?.accountId as string;

  registerNewAddress({
    ...body,
    customerId,
  })
    .then(() => {
      res.redirect("/accounts/me/addresses?success=Novo endereço cadastrado");
    })
    .catch((error) => {
      res.render(`accounts/address`, {
        error: error.message,
      });
    });
};
export const getAddressesController: Controller = (req, res) => {
  const accountId = req.cookies?.accountId as string;
  getAddresses(accountId)
    .then((addresses) => {
      res.render("accounts/addresses", {
        error: req.query.error,
        success: req.query.success,
        addresses,
      });
    })
    .catch(() => {
      res.redirect("/accounts/me?error=Erro ao buscar endereços");
    });
};
export const getAddressController: Controller = (req, res) => {
  const addressId = req.params.id;
  const accountId = req.cookies?.accountId as string;
  getAdddress(addressId, accountId)
    .then((address) => {
      res.render("accounts/address", {
        error: req.query.error,
        success: req.query.success,
        ...address,
      });
    })
    .catch(() => {
      res.redirect("/accounts/me/addresses?error=Erro ao buscar endereço");
    });
};
export const editAddressController: Controller = (req, res) => {
  const addressId = req.params.id;
  interface Body {
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
  const customerId = req.cookies?.accountId as string;

  updateAddress({
    ...body,
    addressId,
    customerId,
  })
    .then(() => {
      res.redirect("/accounts/me/addresses?success=Endereço atualizado");
    })
    .catch((error) => {
      res.redirect(`/accounts/me/addresses?error=${error.message}`);
    });
};
export const deleteAddressController: Controller = (req, res) => {
  const id = req.params.id;
  const accountId = req.cookies?.accountId as string;

  removeAddress(id, accountId)
    .then(() => {
      res.redirect("/accounts/me/addresses?success=Endereço removido");
    })
    .catch((error) => {
      res.redirect(`/accounts/me/addresses?error=${error.message}`);
    });
};

export const newCardController: Controller = (req, res) => {
  const accountId = req.cookies?.accountId as string;
  const { cardNumber, cardName, cardCVV, cardBrand, cardExpiry } = req.body;
  registerNewCard({
    cardNumber,
    holderName: cardName,
    expirationDate: cardExpiry,
    cvv: cardCVV,
    flag: cardBrand,
    customerId: accountId,
  })
    .then(() => {
      res.redirect("/accounts/me/cards?success=Novo cartão cadastrado");
    })
    .catch((error) => {
      res.render(`accounts/newCard`, {
        error: error.message,
        success: req.query.success,
      });
    });
};
export const getCardsController: Controller = (req, res) => {
  const accountId = req.cookies?.accountId as string;
  getCards(accountId)
    .then((cards) => {
      res.render("accounts/cards", {
        error: req.query.error,
        success: req.query.success,
        cards,
      });
    })
    .catch(() => {
      res.redirect("/accounts/me?error=Erro ao buscar cartões");
    });
};
export const deleteCardController: Controller = (req, res) => {
  const id = req.params.id;
  const accountId = req.cookies?.accountId as string;
  deleteCard(id, accountId)
    .then(() => {
      res.redirect("/accounts/me/cards?success=Cartão removido");
    })
    .catch((error) => {
      res.redirect(`/accounts/me/cards?error=${error.message}`);
    });
};

export const getMyCuponsController: Controller = (req, res) => {
  res.render("accounts/mycupons");
};

export const getMyOrdersController: Controller = (req, res) => {
  const accountId = req.cookies?.accountId as string;

  const orders = MockResponses.makedOrders.filter(
    (order) => order.customer?.id === accountId,
  );

  res.render("accounts/orders", {
    orders,
  });
};
