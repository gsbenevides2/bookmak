/// <reference types="cypress" />

import clientAddressTests from "./client_crud/address";
import clientBasicTests from "./client_crud/basic";
import clientCardTests from "./client_crud/card";

describe("CRUD de Cliente", clientBasicTests);
describe("CRUD de Cliente - Endereço", clientAddressTests);
describe("CRUD de Cliente - Cartão", clientCardTests);
