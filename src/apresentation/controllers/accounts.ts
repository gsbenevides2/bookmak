import { type Controller } from "./types";
import customerUseCase from "../../business/useCases/customer";

export const getMyAccount: Controller = (req, res) => {
  const accountIdCookie = req.cookies?.accountId as string;
  customerUseCase
    .getCustomerData(accountIdCookie)
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
export const changeMyAccountData: Controller = (req, res) => {
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
  customerUseCase
    .updateCustomerData(accountIdCookie, req.body as Body)
    .then(() => {
      res.redirect("/accounts/me?success=Dados atualizados");
    })
    .catch((error) => {
      res.redirect(`/accounts/me?error=${error.message}`);
    });
};
export const deactivateMyAccount: Controller = (req, res) => {
  const accountIdCookie = req.cookies?.accountId as string;
  customerUseCase
    .deactivateAccount(accountIdCookie)
    .then(() => {
      res.clearCookie("accountId");
      res.redirect("/login?error=Conta desativada");
    })
    .catch(() => {
      res.redirect("/accounts/me?error=Erro ao desativar conta");
    });
};
export const changeMyPassword: Controller = (req, res) => {
  interface Body {
    password: string;
    newPassword: string;
    confirmPassword: string;
  }
  const body = req.body as Body;
  const accountIdCookie = req.cookies?.accountId as string;
  customerUseCase
    .changePassword({
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

export const newAddress: Controller = (req, res) => {
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

  customerUseCase
    .registerNewAddress({
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
export const getAddresses: Controller = (req, res) => {
  const accountId = req.cookies?.accountId as string;
  customerUseCase
    .getAddresses(accountId)
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
export const getAddress: Controller = (req, res) => {
  const addressId = req.params.id;
  const accountId = req.cookies?.accountId as string;
  customerUseCase
    .getAdddress(addressId, accountId)
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
export const editAddress: Controller = (req, res) => {
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

  customerUseCase
    .updateAddress({
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
export const deleteAddress: Controller = (req, res) => {
  const id = req.params.id;
  const accountId = req.cookies?.accountId as string;

  customerUseCase
    .removeAddress(id, accountId)
    .then(() => {
      res.redirect("/accounts/me/addresses?success=Endereço removido");
    })
    .catch((error) => {
      res.redirect(`/accounts/me/addresses?error=${error.message}`);
    });
};

export const newCard: Controller = (req, res) => {
  const accountId = req.cookies?.accountId as string;
  const { cardNumber, cardName, cardCVV, cardBrand, cardExpiry } = req.body;
  customerUseCase
    .registerNewCard({
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
export const getCards: Controller = (req, res) => {
  const accountId = req.cookies?.accountId as string;
  customerUseCase
    .getCards(accountId)
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
export const deleteCard: Controller = (req, res) => {
  const id = req.params.id;
  const accountId = req.cookies?.accountId as string;
  customerUseCase
    .deleteCard(id, accountId)
    .then(() => {
      res.redirect("/accounts/me/cards?success=Cartão removido");
    })
    .catch((error) => {
      res.redirect(`/accounts/me/cards?error=${error.message}`);
    });
};

export const getMyCupons: Controller = (req, res) => {
  const accountId = req.cookies?.accountId as string;
  customerUseCase
    .viewCoupons(accountId)
    .then((coupons) => {
      res.render("accounts/coupons", {
        coupons,
      });
    })
    .catch(() => {
      res.redirect("/accounts/me?error=Erro ao buscar cupons");
    });
};

export const getMyOrders: Controller = (req, res) => {
  const accountId = req.cookies?.accountId as string;
  const error = req.query.error;
  customerUseCase
    .getOrders(accountId)
    .then((orders) => {
      res.render("accounts/orders", {
        orders,
        error,
      });
    })
    .catch(() => {
      res.redirect("/accounts/me?error=Erro ao buscar pedidos");
    });
};
export const getDataFromOrder: Controller = (req, res) => {
  const orderId = req.params.orderId;
  const accountId = req.cookies?.accountId as string;
  const error = req.query.error;
  customerUseCase
    .getOrder(orderId, accountId)
    .then((order) => {
      if (order == null) {
        res.redirect("/accounts/me/orders");
        return;
      }
      res.render("accounts/order", {
        order,
        error,
      });
    })
    .catch(() => {
      res.redirect("/accounts/me/orders");
    });
};
export const checkOrderIsExchangeable: Controller = (req, res) => {
  const orderId = req.params.orderId;
  const accountId = req.cookies?.accountId as string;
  customerUseCase
    .checkOrderIsExchangeable(orderId, accountId)
    .then(async (isExchangeable) => {
      if (!isExchangeable) {
        throw new Error("Pedido não pode ser trocado");
      }

      return await customerUseCase.getOrder(orderId, accountId);
    })
    .then((order) => {
      res.render("accounts/changeOrder", {
        orderId,
        order,
      });
    })
    .catch((error) => {
      res.redirect(`/accounts/me/orders/${orderId}?error=${error.message}`);
    });
};
export const exchangeOrder: Controller = (req, res) => {
  const orderId = req.params.orderId;
  const accountId = req.cookies?.accountId as string;
  const itemsQuantity = req.body.quantity as Record<string, string>;
  customerUseCase
    .changeOrder(orderId, accountId, itemsQuantity)
    .then(() => {
      res.redirect(`/accounts/me/orders/${orderId}`);
    })
    .catch((error) => {
      res.redirect(`/accounts/me/orders/${orderId}?error=${error.message}`);
    });
};

export const checkOrderIsCancelable: Controller = (req, res) => {
  const orderId = req.params.orderId;
  const accountId = req.cookies?.accountId as string;
  customerUseCase
    .checkOrderIsCancelable(orderId, accountId)
    .then(async () => {
      return await customerUseCase.getOrder(orderId, accountId);
    })
    .then((order) => {
      res.render("accounts/cancelOrder", {
        orderId,
        order,
      });
    })
    .catch((error) => {
      res.redirect(`/accounts/me/orders/${orderId}?error=${error.message}`);
    });
};

export const cancelOrder: Controller = (req, res) => {
  const orderId = req.params.orderId;
  const accountId = req.cookies?.accountId as string;
  customerUseCase
    .cancelOrder(orderId, accountId)
    .then(() => {
      res.redirect(`/accounts/me/orders/${orderId}`);
    })
    .catch((error) => {
      res.redirect(`/accounts/me/orders/${orderId}?error=${error.message}`);
    });
};
