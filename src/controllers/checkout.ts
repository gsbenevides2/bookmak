import { faker } from "@faker-js/faker";
import { MockResponses, OrderStatus, orderStatusText } from "../mocks/mock";
import { Address } from "../models/Address";
import { Controller } from "../types/controller";
import getAddresses from "../useCases/customer/getAddresses";
import { getCards } from "../useCases/customer/getCards";
import { getCustomerAddressSettings } from "../useCases/customer/getCustomerAddressSettings";
import { getCustomerData } from "../useCases/customer/getCustomerData";
import { shippingSimulator } from "../utils/shippingSimulator";

export const getCart: Controller = (_req, res) => {
  const cart = MockResponses.order.items;
  const total = cart.reduce((acc, item) => acc + item.subtotal, 0);
  if (cart.length === 0) {
    res.render("checkout/empty-cart");
  } else
    res.render("checkout/cart", {
      cart,
      total,
    });
};
export const updateCart: Controller = (req, res) => {
  const { action, bookId } = req.body;
  const cart = MockResponses.order.items;
  if (action === "ADD") {
    const { quantity } = req.body;
    const book = MockResponses.books.find((book) => book.id === bookId);
    const bookInCart = cart.find((item) => item.book.id === bookId);

    if (bookInCart != null) {
      bookInCart.quantity = bookInCart.quantity + parseInt(quantity as string);
      bookInCart.subtotal = bookInCart.book.price * bookInCart.quantity;
    } else if (book != null) {
      cart.push({
        book,
        quantity: parseInt(quantity as string),
        subtotal: book.price * quantity,
      });
    }
  }

  if (action === "REMOVE") {
    const index = cart.findIndex((item) => item.book.id === bookId);
    cart.splice(index, 1);
  }
  if (action === "UPDATE_QUANTITY") {
    const quantity = req.body.quantity;
    if (quantity <= 0) {
      res.redirect("/checkout/cart");
      return;
    }
    const index = cart.findIndex((item) => item.book.id === bookId);
    cart[index].quantity = quantity;
    cart[index].subtotal = cart[index].book.price * quantity;
  }

  MockResponses.order.items = cart;

  res.redirect("/checkout/cart");
};

export const getAvailableBokmarkTexts: Controller = (req, res) => {
  const {
    aiBookmarkTexts,
    bookmarkStyles,
    order: { items: cart },
  } = MockResponses;
  if (cart.length === 0) return res.redirect("/checkout/cart");
  res.render("checkout/bookmark", {
    aiBookmarkTexts,
    bookmarkStyles,
    error: null,
  });
};
export const updateBookmarkTextInOrder: Controller = (req, res) => {
  interface Body {
    text?: string;
    customText?: string;
    bookmarkStyle?: string;
  }
  const { text, customText, bookmarkStyle } = req.body as Body;
  const bookmarkText =
    customText != null ? (customText.length > 0 ? customText : text) : text;

  if (bookmarkText == null || bookmarkText.trim() === "") {
    res.render("checkout/bookmark", {
      aiBookmarkTexts: MockResponses.aiBookmarkTexts,
      bookmarkStyles: MockResponses.bookmarkStyles,
      error: "Selecione um texto ou insira um texto personalizado.",
    });
    return;
  }
  if (bookmarkText.length > 200) {
    res.render("checkout/bookmark", {
      aiBookmarkTexts: MockResponses.aiBookmarkTexts,
      bookmarkStyles: MockResponses.bookmarkStyles,
      error: "O texto do marcador não pode ter mais de 200 caracteres.",
    });
    return;
  }

  if (bookmarkStyle == null) {
    res.render("checkout/bookmark", {
      aiBookmarkTexts: MockResponses.aiBookmarkTexts,
      bookmarkStyles: MockResponses.bookmarkStyles,
      error: "Selecione um estilo de marcador.",
    });
    return;
  }

  MockResponses.order = {
    ...MockResponses.order,
    bookmarkText,
    bookmarkStyle,
  };
  res.redirect("/checkout/addresses");
};

export const getAddressSettigsForCurrentOrder: Controller = (req, res) => {
  const customerId = req.cookies?.accountId as string;
  if (MockResponses.order.items.length === 0) {
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
          shippingPrice: shippingSimulator(),
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
  const error = req.query.error;
  Promise.all([getCustomerData(accountId), getCards(accountId)])
    .then(([customer, cards]) => {
      if (MockResponses.order.items.length === 0) {
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

      const subTotal = MockResponses.order.items.reduce(
        (acc, item) => acc + item.subtotal,
        0,
      );

      const shippingPrice = shippingSimulator();

      const discouts = MockResponses.order.coupons.reduce(
        (acc, coupon) => coupon.value + acc,
        0,
      );

      const totalPrice = subTotal + shippingPrice - discouts;

      res.render("checkout/payment", {
        account: customer,
        cards: cards,
        billingAddress: MockResponses.order.addressPayment,
        deliveryAddress: MockResponses.order.addressShipping,
        cartItens: MockResponses.order.items,
        shippingPrice,
        subTotal,
        totalPrice,
        discouts,
        coupons: MockResponses.order.coupons,
        error,
      });
    })
    .catch(() => {
      res.redirect("/login?error=Erro ao buscar dados");
    });
};
export const finishCheckout: Controller = (req, res) => {
  const { cardId } = req.body;
  const accountId = req.cookies.accountId;
  Promise.all([getCustomerData(accountId), getCards(accountId)]).then(
    ([customer, cards]) => {
      const card = cards.find((card) => card.id === cardId);
      if (card == null) {
        res.redirect(
          "/checkout/payment?error=Cartão não encontrado ou inválido",
        );
        return;
      }
      if (customer == null) {
        res.redirect("/login?error=Erro ao buscar dados");
        return;
      }

      const subTotal = MockResponses.order.items.reduce(
        (acc, item) => acc + item.subtotal,
        0,
      );

      const shippingPrice = shippingSimulator();

      const discouts = MockResponses.order.coupons.reduce(
        (acc, coupon) => coupon.value + acc,
        0,
      );

      const totalPrice = subTotal + shippingPrice - discouts;
      const statusText = [
        `${new Date().toLocaleString()} - ${orderStatusText[OrderStatus.PROCESSING]} - Estamos recebendo seu pagamento. Aguarde!`,
      ];
      MockResponses.order = {
        ...MockResponses.order,
        card,
        customer,
        status: OrderStatus.PROCESSING,
        statusObservation: statusText,
        subTotal,
        shippingPrice,
        totalPrice,
      };
      const orderId = MockResponses.order.id;

      MockResponses.makedOrders.push({
        ...MockResponses.order,
      });

      MockResponses.order.items = [];
      MockResponses.order = {
        id: faker.string.uuid(),
        coupons: [],
        items: [],
      };
      res.redirect("/accounts/me/orders/" + orderId);
    },
  );
};
