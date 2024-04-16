import { Controller } from "../types/controller";
import getAddresses from "../useCases/customer/getAddresses";
import getCards from "../useCases/customer/getCards";
import getCustomerAddressSettings from "../useCases/customer/getCustomerAddressSettings";

import checkoutUseCases from "../useCases/checkout";
export const getCart: Controller = async (req, res) => {
  const orderId = req.cookies.orderId as string;

  await checkoutUseCases
    .getOrder(orderId)
    .then((order) => {
      if (order.items.length === 0) {
        res.render("checkout/empty-cart");
        return;
      }
      res.render("checkout/cart", {
        order,
      });
    })
    .catch((error) => {
      res.redirect("/login?error=" + error.message);
    });
};
export const updateCart: Controller = async (req, res) => {
  const { action } = req.body;
  const orderId = req.cookies.orderId as string;

  if (action === "ADD") {
    const { quantity, bookId } = req.body;
    await checkoutUseCases.addToCart(
      bookId,
      orderId,
      parseInt(quantity as string),
    );
  }
  if (action === "REMOVE") {
    const { orderItemId } = req.body;
    await checkoutUseCases.removeFromCart(orderItemId, orderId);
  }
  if (action === "UPDATE_QUANTITY") {
    const { quantity, orderItemId } = req.body;
    await checkoutUseCases.updateQuantity(
      orderItemId,
      parseInt(quantity as string),
      orderId,
    );
  }

  res.redirect("/checkout/cart");
};

export const getAvailableBokmarkTexts: Controller = (req, res) => {
  const orderId = req.cookies.orderId as string;
  const bookmarkStyles = ["Estilo A", "Estilo 2", "Estilo C"];
  checkoutUseCases
    .getAiBookmarks(orderId)
    .then((bookmarks) => {
      res.json({
        aiBookmarkTexts: bookmarks,
        bookmarkStyles,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};
export const updateBookmarkTextInOrder: Controller = (req, res) => {
  interface Body {
    bookmarkStyle?: string;
    bookmarkText?: string;
  }
  const { bookmarkText, bookmarkStyle } = req.body as Body;
  const orderId = req.cookies.orderId as string;
  if (bookmarkText == null || bookmarkText.trim() === "") {
    res.status(400).json({
      error: "O texto do marcador não pode ser vazio.",
    });
    return;
  }
  if (bookmarkText.length > 200) {
    res.status(400).json({
      error: "O texto do marcador não pode ter mais de 200 caracteres.",
    });
    return;
  }

  if (bookmarkStyle == null) {
    res.send(400).json({
      error: "Selecione um estilo de marcador.",
    });
    return;
  }

  checkoutUseCases
    .saveBookmark({
      bookmarkStyle,
      bookmarkText,
      orderId,
    })
    .then(() => {
      res.status(200).send("OK");
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};

export const getAddressSettigsForCurrentOrder: Controller = (req, res) => {
  const customerId = req.cookies?.accountId as string;
  const orderId = req.cookies?.orderId as string;
  checkoutUseCases
    .getOrder(orderId)
    .then((order) => {
      if (order.items.length === 0) {
        res.redirect("/checkout/cart");
        return;
      }

      if (order.bookmarkText == null || order.bookmarkStyle == null) {
        res.redirect("/checkout/bookmark");
        return;
      }

      return Promise.all([
        getAddresses(customerId),
        getCustomerAddressSettings(customerId),
      ]);
    })
    .then((promiseReturn) => {
      if (promiseReturn == null) return;
      const [addresses, addressSettings] = promiseReturn;
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
  const orderId = req.cookies?.orderId as string;

  checkoutUseCases
    .updateAddress({
      billingAddressId: billingAddress,
      customerId,
      orderId,
      shippingAddressId: deliveryAddress,
    })
    .then(() => {
      res.redirect("/checkout/payment");
    })
    .catch((error) => {
      res.redirect("/login?error=" + error.message);
    });
};

export const getAllDataForCheckout: Controller = (req, res) => {
  const orderId = req.cookies.orderId as string;
  const accountId = req.cookies.accountId as string;
  const error = req.query.error;
  checkoutUseCases
    .recalculateOrderTotal(orderId)
    .then(() =>
      Promise.all([checkoutUseCases.getOrder(orderId), getCards(accountId)]),
    )
    .then(([order, cards]) => {
      if (order.items.length === 0) {
        res.redirect("/checkout/cart");
        return;
      }

      if (order.bookmarkText == null || order.bookmarkStyle == null) {
        res.redirect("/checkout/bookmark");
        return;
      }

      if (order.shippingAddress == null || order.billingAddress == null) {
        res.redirect("/checkout/addresses");
        return;
      }

      res.render("checkout/payment", {
        cards: cards,
        order,
        coupons: [],
        error,
      });
    })
    .catch(() => {
      res.redirect("/login?error=Erro ao buscar dados");
    });
};
export const finishCheckout: Controller = (req, res) => {
  const { cardId } = req.body;
  const customerId = req.cookies.accountId;
  const orderId = req.cookies.orderId;
  checkoutUseCases
    .executeOrder({
      cardId,
      customerId,
      orderId,
    })
    .then(() => {
      res.clearCookie("orderId");
      res.redirect("/accounts/me/orders/" + orderId);
    });
};
