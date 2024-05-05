/// <reference types="cypress" />

import testItem from "./home/test_item";
import testSeach from "./home/test_search";

describe("Busca de Produtos", testSeach);
describe("Item", testItem);
