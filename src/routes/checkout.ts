import { faker } from "@faker-js/faker";
import { Router } from "express";

const checkoutRouter = Router();

interface CartItem {
  id: string;
  cover: string;
  title: string;
  quantity: number;
  unitPrice: string;
  author: string;
  genre: string;
  subtotal: string;
}

const cart: CartItem[] = [];
const qtdItems = faker.number.int({
  min: 1,
  max: 5,
});
for (let i = 0; i < qtdItems; i++) {
  const unitPrice = faker.commerce.price();
  const quantity = faker.number.int({
    min: 1,
    max: 5,
  });
  const subtotal = (parseFloat(unitPrice) * quantity).toFixed(2);
  cart.push({
    id: faker.number.int().toString(),
    cover: faker.image.urlLoremFlickr({
      category: "book",
      width: 200,
      height: 300,
    }),
    title: faker.commerce.productName(),
    quantity,
    unitPrice,
    author: faker.person.fullName(),
    genre: faker.commerce.department(),
    subtotal,
  });
}

const total = cart
  .reduce((acc, item) => {
    return acc + parseFloat(item.subtotal);
  }, 0)
  .toFixed(2);

const checkoutParams = {
  cart,
  total,
};

checkoutRouter.get("/cart", (_req, res) => {
  if (cart.length === 0) {
    res.render("checkout/empty-cart");
  } else res.render("checkout/cart", checkoutParams);
});

checkoutRouter.post("/cart", (req, res) => {
  const { action, bookId } = req.body;
  if (action === "REMOVE") {
    const index = cart.findIndex((item) => item.id === bookId);
    cart.splice(index, 1);
  }
  if (action === "UPDATE_QUANTITY") {
    const quantity = req.body.quantity;
    if (quantity <= 0) {
      res.redirect("/checkout/cart");
      return;
    }
    const index = cart.findIndex((item) => item.id === bookId);
    cart[index].quantity = quantity;
    cart[index].subtotal = (
      parseFloat(cart[index].unitPrice) * quantity
    ).toFixed(2);
  }

  checkoutParams.cart = cart;
  checkoutParams.total = cart
    .reduce((acc, item) => {
      return acc + parseFloat(item.subtotal);
    }, 0)
    .toFixed(2);

  res.redirect("/checkout/cart");
});

export default checkoutRouter;
