export interface AddressFixtureData {
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
}
export interface AuthorFixtureData {
  name: string;
}
export interface BookCategoryFixtureData {
  categoryId: string;
  bookId: string;
}
export interface BookSkuFixtureData {
  id: string;
  title: string;
  cover: string;
  description: string;
  price: number;
  stockQuantity: number;
  bookId: string;
}
export interface BookFixtureData {
  id: string;
  title: string;
  cover: string;
  description: string;
}
export interface CardFixtureData {
  number: string;
  holderName: string;
  flag: string;
  cvv: string;
  monthOfValidity: string;
  yearOfValidity: string;
  active: boolean;
}
export interface CategoryFixtureData {
  id: string;
  name: string;
}
export interface UserFixtureData {
  id: string;
  isAdmin: boolean;
  name: string;
  email: string;
  cpf: string;
  password: string;
  phoneType: string;
  phoneNumber: string;
  gender: string;
  phoneAreaCode: string;
  dateOfBirth: string;
  active: boolean;
}

export interface OrderFixtureData {
  id: string;
  subtotal: number;
  totalPrice: number;
  discounts: number;
  shippingPrice: number;
  bookmarkStyle: string;
  bookmarkText: string;
  generatedBoookmarks: string;
  customerId: string;
  billingAddressId: string;
  shippingAddressId: string;
}

export interface OrderItemFixtureData {
  id: string;
  quantity: number;
  unitSellPrice: number;
  skuId: string;
  orderId: string;
}

export interface AddressResponseFixtureData {
  addresses: AddressFixtureData[];
}

export interface BookmarkResponseFixtureData {
  aiBookmarkTexts: string[];
  bookmarkStyles: string[];
}
