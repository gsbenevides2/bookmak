import { MockResponses } from "../mocks/mock";
import { Address } from "../models/Address";
import { Controller } from "../types/controller";
import getAddresses from "../useCases/customer/getAddresses";
import { getCards } from "../useCases/customer/getCards";
import { getCustomerAddressSettings } from "../useCases/customer/getCustomerAddressSettings";
import { getCustomerData } from "../useCases/customer/getCustomerData";

export const getAddressSettigsForCurrentOrder: Controller = (req, res) => {
  const customerId = req.cookies?.accountId as string;

  Promise.all([
    getAddresses(customerId),
    getCustomerAddressSettings(customerId),
  ])
    .then(([addresses, addressSettings]) => {
      res.render("checkout/selectAddresses", {
        error: null,
        addresses,
        addressSettings,
      });
    })
    .catch(() => {
      res.redirect("/login?error=Erro ao buscar dados");
    });
};
export const updateAddressSettingsForCurrentOrder: Controller = (req, res) => {
  const { billingAddress, deliveryAddress } = req.body;
  const customerId = req.cookies?.accountId as string;
  getAddresses(customerId)
    .then((addresses) => {
      const addressPayment = addresses.find(
        (address) => address.id === billingAddress,
      ) as Address | undefined;

      const addressShipping = addresses.find(
        (address) => address.id === deliveryAddress,
      ) as Address | undefined;

      if (addressPayment != null && addressShipping != null) {
        MockResponses.order = {
          ...MockResponses.order,
          addressPayment,
          addressShipping,
        };
      }
      res.redirect("/checkout/payment");
    })
    .catch(() => {
      res.redirect("/login?error=Erro ao buscar endereços");
    });
};

export const getAllDataForCheckout: Controller = (req, res) => {
  const accountId = req.cookies.accountId;
  Promise.all([getCustomerData(accountId), getCards(accountId)])
    .then(([customer, cards]) => {
      if (MockResponses.cart.length === 0) {
        res.redirect("/checkout/cart");
        return;
      }

      if (
        MockResponses.order.bookmarkText == null ||
        MockResponses.order.bookmarkStyle == null
      ) {
        res.redirect("/checkout/bookmark");
        return;
      }

      if (
        MockResponses.order.addressPayment == null ||
        MockResponses.order.addressShipping == null
      ) {
        res.redirect("/checkout/addresses");
        return;
      }

      res.render("checkout/payment", {
        account: customer,
        cards: cards,
        billingAddress: MockResponses.order.addressPayment,
        deliveryAddress: MockResponses.order.addressShipping,
      });
    })
    .catch(() => {
      res.redirect("/login?error=Erro ao buscar dados");
    });
};
