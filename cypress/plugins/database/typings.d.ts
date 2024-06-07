/// <reference path="../../fixtures/typings.d.ts.d.ts" />

declare interface CustomerTable {
  id: string;
  is_admin: boolean;
  name: string;
  email: string;
  cpf: string;
  password: string;
  phone_type: string;
  phone_number: string;
  phone_area_code: string;
  gender: string;
  date_of_birth: Date;
  delivery_address_id: string;
  billing_address_id: string;
  is_active: boolean;
}

declare interface AddressTable {
  id: string;
  nickname: string;
  street: string;
  house_type: string;
  street_type: string;
  number: string;
  district: string;
  zip_code: string;
  city: string;
  state: string;
  country: string;
  observations: string;
  active: boolean;
  customer_id?: string;
}

declare interface CardTable {
  id: string;
  number: string;
  holder_name: string;
  flag: string;
  cvv: string;
  month_of_validity: string;
  year_of_validity: string;
  active: boolean;
  customer_id: string;
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
  author_id: string;
  book_id: string;
}
declare interface BookCategoryTable {
  category_id: string;
  book_id: string;
}
declare interface BookSkuTable {
  id: string;
  title: string;
  cover: string;
  description: string;
  price: number;
  stock_quantity: number;
  book_id: string;
}

declare interface OrderTable {
  id: string;
  subtotal: number;
  total_price: number;
  discounts: number;
  shipping_price: number | null;
  bookmark_style: string | null;
  bookmark_text: string | null;
  generated_bookmarks: string;
  customer_id: string | null;
  billing_address_id: string | null;
  shipping_address_id: string | null;
}

declare interface OrderItemTable {
  id: string;
  quantity: number;
  unit_sell_price: number;
  sku_id: string;
  order_id: string;
}

declare interface OrderPaymentMethodTable {
  id: string;
  value: number;
  card_id: string;
  coupon_id: string | null;
  order_id: string;
}

declare interface OrderUpdateTable {
  id: string;
  order_status: string;
  observations: string;
  timestamp: string;
  order_id: string;
}

declare interface CategoryTable {
  id: string;
  name: string;
}

declare interface CouponTable {
  id: string;
  code: string;
  value: number;
  description: string;
  type: "discount" | "exchange";
  used: boolean;
  attached_customer_id?: string;
}

declare interface DatabaseCreateCustomerData {
  customer: CustomerFixtureData;
  address: AddressFixtureData;
  is_admin?: boolean;
  is_ative?: boolean;
}

declare interface DatabaseCreateAddressData {
  address: AddressFixtureData;
  active?: boolean;
  customer_id?: string;
}

declare interface DatabaseUpdateAddressData {
  customer_id: string;
  address_id: string;
}

declare interface DatabaseCreateCardData {
  card: CardFixtureData;
  active?: boolean;
  customer_id: string;
}

declare interface DatabaseCreateCouponData {
  coupon: CouponFixtureData;
  used?: boolean;
  attached_customer_id?: string;
}

declare type DatabaseCreateBookData = BookFixtureData;

declare type DatabaseCreateOrderData = OrderFixtureData;
