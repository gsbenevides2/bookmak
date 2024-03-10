import { Router } from "express";
import { MockResponses } from "../mocks/mock";
import { faker } from "@faker-js/faker";

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
  console.log(req.body);
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
  res.redirect("/login?goToCheckout=true");
});

checkoutRouter.get("/address", (req, res) => {
  res.render("checkout/address", {
    error: null,
    addresses: MockResponses.addresses,
  });
});

checkoutRouter.post("/address", (req, res) => {
  const {
    selectedAddress,
    nickname,
    typeOfResidence,
    typeOfStreat,
    streat,
    number,
    district,
    code,
    city,
    state,
    country,
    observation,
  } = req.body;

  if (selectedAddress != null && selectedAddress.length > 0) {
    const address = MockResponses.addresses.find(
      (address) => address.id === selectedAddress,
    );
    if (address != null) {
      MockResponses.order = {
        ...MockResponses.order,
        address,
      };
      res.redirect("/checkout/payment");
    }
    res.render("checkout/address", {
      error: "Selecione um endereço válido.",
      addresses: MockResponses.addresses,
    });
    return;
  }

  const newAddress = {
    id: faker.string.uuid(),
    nickname,
    typeOfResidence,
    typeOfStreat,
    streat,
    number,
    district,
    code,
    city,
    state,
    country,
    observation,
  };
  MockResponses.addresses.push(newAddress);
  MockResponses.order = {
    ...MockResponses.order,
    address: newAddress,
  };
  res.redirect("/checkout/payment");
});

export default checkoutRouter;
