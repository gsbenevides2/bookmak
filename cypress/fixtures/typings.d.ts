declare interface AddressFixtureData {
  id: string;
  houseType: "house" | "apartment" | "farm";
  streetType: "street" | "avenue" | "road" | "alley";
  nickname: string;
  street: string;
  number: string;
  district: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  observations: string;
}
declare interface CustomerFixtureData {
  id: string;
  email: string;
  name: string;
  cpf: string;
  dateOfBirth: Date;
  gender: "male" | "female" | "uniformed" | "others";
  phoneType: "cellphone" | "landline";
  phoneAreaCode: string;
  phoneNumber: string;
  password: string;
  passwordHash: string;
}
declare interface CardFixtureData {
  id: string;
  number: string;
  holderName: string;
  flag: "visa" | "mastercard";
  cvv: string;
  monthOfValidity: string;
  yearOfValidity: string;
}

declare interface BookFixtureData {
  authors: Array<{
    id: string;
    name: string;
  }>;
  categories: Array<{
    id: string;
    name: string;
  }>;
  books: Array<{
    id: string;
    title: string;
    cover: string;
    description: string;
    bookmarkStyle: null | string;
  }>;
  booksAuthors: Array<{
    bookId: string;
    authorId: string;
  }>;
  booksCategories: Array<{
    bookId: string;
    categoryId: string;
  }>;
  booksSkus: Array<{
    id: string;
    title: string;
    cover: string;
    description: string;
    price: number;
    stockQuantity: number;
    bookId: string;
  }>;
}
declare interface BookmarkFixtureData {
  aiBookmarkTexts: string[];
  bookmarkStyles: string[];
}

declare interface OrderFixtureData {
  orders: Array<{
    id: string;
    subtotal: number;
    totalPrice: number;
    discounts: number;
    shippingPrice: number;
    bookmarkStyle: string | null;
    bookmarkText: string | null;
    generatedBookmarks: string;
    customerId: string | null;
    billingAddressId: string | null;
    shippingAddressId: string | null;
  }>;
  orderItem: Array<{
    id: string;
    quantity: number;
    unitSellPrice: number;
    skuId: string;
    orderId: string;
    changeQuantity?: number;
  }>;
  orderPaymentMethod: Array<{
    id: string;
    value: number;
    cardId: string;
    couponId: string | null;
    orderId: string;
  }>;
  orderUpdate: Array<{
    id: string;
    status: string;
    observations: string;
    timestamp: string;
    orderId: string;
  }>;
}

declare interface CouponFixtureData {
  id: string;
  code: string;
  value: number;
  description: string;
  type: "discount" | "exchange";
}
