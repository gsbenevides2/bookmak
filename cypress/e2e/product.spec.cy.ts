/// <reference types="cypress" />

import testAddToCart from "./product/testAddToCart";
import testInfo from "./product/testInfo";

describe("Informações do Produto", testInfo);
describe("Adicionar ao Carrinho", testAddToCart);
