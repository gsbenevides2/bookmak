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

export const getMyAccountController: Controller = (req, res) => {
  const accountIdCookie = req.cookies?.accountId as string;
  getCustomerData(accountIdCookie)
    .then((account) => {
      if (account == null) {
        res.redirect("/login");
      } else {
        const user = {
          admin: false,
          email: account.email,
          name: account.name,
          cpf: account.cpf,
          dateOfBirth: account.dateOfBirth.toISOString().split("T")[0],
          gender: account.gender,
          phoneAreaCode: account.phoneAreaCode,
          phoneNumber: account.phoneNumber,
          phoneType: account.phoneType,
        };
        res.render("accounts/account", {
          user,
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
  const {
    name,
    email,
    cpf,
    dateOfBirth,
    gender,
    phoneAreaCode,
    phoneNumber,
    phoneType,
  } = req.body;
  updateCustomerData(accountIdCookie, {
    name,
    email,
    cpf,
    dateOfBirth,
    gender,
    phoneAreaCode,
    phoneNumber,
    phoneType,
  })
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
    observations,
  } = req.body;
  const accountIdCookie = req.cookies?.accountId as string;

  registerNewAddress({
    city,
    country,
    customerId: accountIdCookie,
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
    .then(() => {
      res.redirect("/accounts/me/addresses?success=Novo endereço cadastrado");
    })
    .catch((error) => {
      res.render(`accounts/new-address`, {
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
      res.render("accounts/newAddress", {
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
  const accountId = req.cookies?.accountId as string;
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
    observations,
  } = req.body;

  updateAddress({
    addressId,
    city,
    country,
    customerId: accountId,
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
  console.log(cardNumber, cardName, cardCVV, cardBrand, cardExpiry);
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
}