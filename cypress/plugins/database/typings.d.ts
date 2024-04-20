/// <reference path="../../fixtures/typings.d.ts.d.ts" />

declare interface CustomerTable {
  id: string;
  isAdmin: boolean;
  name: string;
  email: string;
  cpf: string;
  password: string;
  phoneType: string;
  phoneNumber: string;
  phoneAreaCode: string;
  gender: string;
  dateOfBirth: Date;
  deliveryAddressId: string;
  billingAddressId: string;
  isActive: boolean;
}

declare interface AddressTable {
  id: string;
  nickname: string;
  street: string;
  houseType: string;
  streetType: string;
  number: string;
  district: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  observations: string;
  active: boolean;
  customerId?: string;
}

declare interface CardTable {
  id: string;
  number: string;
  holderName: string;
  flag: string;
  cvv: string;
  monthOfValidity: string;
  yearOfValidity: string;
  active: boolean;
  customerId: string;
}

declare interface AuthorTable {
  id: string;
  name: string;
}
declare interface BookTable {
  id: string;
  title: string;
  cover: string;
  description: string;
}
declare interface BookAuthorTable {
  authorId: string;
  bookId: string;
}
declare interface BookCategoryTable {
  categoryId: string;
  bookId: string;
}
declare interface BookSkuTable {
  id: string;
  title: string;
  cover: string;
  description: string;
  price: number;
  stockQuantity: number;
  bookId: string;
}

declare interface OrderTable {
  id: string;
  subtotal: number;
  totalPrice: number;
  discounts: number;
  shippingPrice: number;
  bookmarkStyle: string;
  bookmarkText: string;
  generatedBookmarks: string;
  customerId: string;
  billingAddressId: string;
  shippingAddressId: string;
}

declare interface OrderItemTable {
  id: string;
  quantity: number;
  unitSellPrice: number;
  skuId: string;
  orderId: string;
}

declare interface OrderPaymentMethodTable {
  id: string;
  value: number;
  cardId: string;
  couponId: string | null;
  orderId: string;
}

declare interface OrderUpdateTable {
  id: string;
  status: string;
  observations: string;
  timestamp: string;
  orderId: string;
}

declare interface CategoryTable {
  id: string;
  name: string;
}

declare interface DatabaseCreateCustomerData {
  customer: CustomerFixtureData;
  address: AddressFixtureData;
  isAdmin?: boolean;
  isActive?: boolean;
}

declare interface DatabaseCreateAddressData {
  address: AddressFixtureData;
  active?: boolean;
  customerId?: string;
}

declare interface DatabaseUpdateAddressData {
  customerId: string;
  addressId: string;
}

declare interface DatabaseCreateCardData {
  card: CardFixtureData;
  active?: boolean;
  customerId: string;
}

declare type DatabaseCreateBookData = BookFixtureData;

declare type DatabaseCreateOrderData = OrderFixtureData;
