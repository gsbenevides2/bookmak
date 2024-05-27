import getAddresses from "../../business/useCases/customer/getAddresses";
import getCards from "../../business/useCases/customer/getCards";
import getCustomerAddressSettings from "../../business/useCases/customer/getCustomerAddressSettings";
import { type Controller } from "./types";

import checkoutUseCases from "../../business/useCases/checkout";

export const getCart: Controller = (req, res) => {
  const orderId = req.cookies.orderId as string;

  checkoutUseCases
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
export const updateCart: Controller = (req, res) => {
  const { action } = req.body;
  const orderId = req.cookies.orderId as string;

  const sucessRedirect = (): void => {
    res.redirect("/checkout/cart");
  };
  const errorRedirect = (error: Error): void => {
    res.redirect("/checkout/cart?error=" + error.message);
  };

  if (action === "ADD") {
    interface Body {
      quantity: string;
      bookId: string;
    }
    const { quantity, bookId } = req.body as Body;
    checkoutUseCases
      .addToCart(bookId, orderId, parseInt(quantity))
      .then(sucessRedirect, errorRedirect);
  }
  if (action === "REMOVE") {
    interface Body {
      orderItemId: string;
    }
    const { orderItemId } = req.body as Body;
    checkoutUseCases
      .removeFromCart(orderItemId, orderId)
      .then(sucessRedirect, errorRedirect);
  }
  if (action === "UPDATE_QUANTITY") {
    interface Body {
      quantity: string;
      orderItemId: string;
    }
    const { quantity, orderItemId } = req.body as Body;
    checkoutUseCases
      .updateQuantity(orderItemId, parseInt(quantity), orderId)
      .then(sucessRedirect, errorRedirect);
  }
};

export const getAvailableBokmarkTexts: Controller = (req, res) => {
  const orderId = req.cookies.orderId as string;

  const promises = [
    checkoutUseCases.getAiBookmarks(orderId),
    checkoutUseCases.getBookmakStyle(orderId),
  ];

  Promise.all(promises)
    .then(([aiBookmarkTexts, bookmarkStyles]) => {
      res.json({
        aiBookmarkTexts,
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
    .then(async (order) => {
      if (order.items.length === 0) {
        res.redirect("/checkout/cart");
        return;
      }

      if (order.bookmarkText == null || order.bookmarkStyle == null) {
        res.redirect("/checkout/bookmark");
        return;
      }

      return await Promise.all([
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
    .then(
      async () =>
        await Promise.all([
          checkoutUseCases.getOrder(orderId),
          getCards(accountId),
        ]),
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
        cards,
        order,
        coupons: [],
        error,
      });
    })
    .catch(() => {
      res.redirect("/login?error=Erro ao buscar dados");
    });
};
export const addCoupon: Controller = (req, res) => {
  interface Body {
    couponCode: string;
  }
  const { couponCode } = req.body as Body;
  const accountId = req.cookies.accountId as string;
  const orderId = req.cookies.orderId as string;

  checkoutUseCases
    .addCoupon({ code: couponCode, accountId, orderId })
    .then(() => {
      res.redirect("/checkout/payment");
    })
    .catch((error) => {
      res.redirect("/checkout/payment?error=" + error.message);
    });
};
export const removeCoupon: Controller = (req, res) => {
  const { couponCode } = req.params;
  const orderId = req.cookies.orderId as string;

  checkoutUseCases
    .removeCoupon(orderId, couponCode)
    .then(() => {
      res.redirect("/checkout/payment");
    })
    .catch((error) => {
      res.redirect("/checkout/payment?error=" + error.message);
    });
};
export const finishCheckout: Controller = (req, res) => {
  interface Body {
    cards: string;
  }
  const { cards } = req.body as Body;

  const customerId = req.cookies.accountId;
  const orderId = req.cookies.orderId;
  try {
    const cardsParsed = JSON.parse(cards);

    checkoutUseCases
      .executeOrder({
        cards: cardsParsed,
        customerId,
        orderId,
      })
      .then(() => {
        res.clearCookie("orderId");
        res.redirect("/accounts/me/orders/" + orderId);
      })
      .catch((error) => {
        res.redirect("/checkout/payment?error=" + error.message);
      });
  } catch (_error) {
    res.redirect("/checkout/payment?error=Erro de dados inválidos");
  }
};
