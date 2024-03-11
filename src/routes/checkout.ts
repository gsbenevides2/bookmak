import { Router } from "express";
import { MockResponses } from "../mocks/mock";

const checkoutRouter = Router();

checkoutRouter.get("/cart", (_req, res) => {
  const cart = MockResponses.cart;
  const total = MockResponses.total;
  if (cart.length === 0) {
    res.render("checkout/empty-cart");
  } else
    res.render("checkout/cart", {
      cart,
      total,
    });
});

checkoutRouter.post("/cart", (req, res) => {
  const { action, bookId } = req.body;
  const cart = MockResponses.cart;
  if (action === "ADD") {
    const { quantity } = req.body;
    const book = MockResponses.books.find((book) => book.id === bookId);
    const bookInCart = cart.find((item) => item.book.id === bookId);

    if (bookInCart != null) {
      bookInCart.quantity = bookInCart.quantity + parseInt(quantity as string);
      bookInCart.subtotal = (
        parseFloat(bookInCart.book.price) * bookInCart.quantity
      ).toFixed(2);
    } else if (book != null) {
      cart.push({
        book,
        quantity: parseInt(quantity as string),
        subtotal: (parseFloat(book.price) * quantity).toFixed(2),
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
    cart[index].subtotal = (
      parseFloat(cart[index].book.price) * quantity
    ).toFixed(2);
  }

  MockResponses.cart = cart;

  res.redirect("/checkout/cart");
});

checkoutRouter.get("/bookmark", (_req, res) => {
  const { aiBookmarkTexts, bookmarkStyles } = MockResponses;
  res.render("checkout/bookmark", {
    aiBookmarkTexts,
    bookmarkStyles,
    error: null,
  });
});

checkoutRouter.post("/bookmark", (req, res) => {
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
    bookmarkText,
    bookmarkStyle,
  };
  res.redirect("/login?redirectTo=/checkout/addresses");
});

checkoutRouter.get("/addresses", (req, res) => {
  res.render("checkout/selectAddresses", {
    error: null,
    addresses: MockResponses.addresses,
  });
});

checkoutRouter.post("/addresses", (req, res) => {
  const { billingAddress, shippingAddress } = req.body;
  const addresses = MockResponses.addresses;
  const address = addresses.find((address) => address.id === billingAddress);
  if (address != null) {
    MockResponses.order = {
      ...MockResponses.order,
      addressPayment: address,
    };
  }
  const shipping = addresses.find((address) => address.id === shippingAddress);
  if (shipping != null) {
    MockResponses.order = {
      ...MockResponses.order,
      addressShipping: shipping,
    };
  }
  res.redirect("/checkout/payment");
});

checkoutRouter.get("/payment", (req, res) => {
  const accountId = req.cookies.accountId;
  const account = MockResponses.accounts.find(
    (account) => account.id === accountId,
  );
  if (account == null) {
    res.redirect("/login?redirectTo=/checkout/payment");
    return;
  }

  res.render("checkout/payment", {
    error: null,
    order: MockResponses.order,
    cart: MockResponses.cart,
    total: MockResponses.total,
    account: {
      ...account,
      birthdate: account.birthdate
        .toISOString()
        .split("T")[0]
        .split("-")
        .reverse()
        .join("/"),
    },
    cards: MockResponses.cards,
  });
});

export default checkoutRouter;
