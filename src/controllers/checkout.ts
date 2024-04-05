import { MockResponses } from "../mocks/mock";
import { Address } from "../models/Address";
import { Controller } from "../types/controller";
import getAddresses from "../useCases/customer/getAddresses";
import { getCustomerAddressSettings } from "../useCases/customer/getCustomerAddressSettings";

export const getProductsInCurrentOrder: Controller = (req, res) => {
  res.render("checkout/cart", {
    error: null,
    products: [],
  });
};

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
  const { billingAddress, shippingAddress } = req.body;
  const customerId = req.cookies?.accountId as string;
  getAddresses(customerId)
    .then((addresses) => {
      const addressPayment = addresses.find(
        (address) => address.id === billingAddress,
      ) as Address | undefined;

      const addressShipping = addresses.find(
        (address) => address.id === shippingAddress,
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
