export interface AddressTable {
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
  customerId?: string;
  active: boolean;
}
export interface AuthorTable {
  id: string;
  name: string;
}
export interface BookTable {
  id: string;
  title: string;
  cover: string;
  description: string;
}
export interface BookAuthorTable {
  authorId: string;
  bookId: string;
}
export interface BookCategoryTable {
  categoryId: string;
  bookId: string;
}
export interface BookSkuTable {
  id: string;
  title: string;
  cover: string;
  description: string;
  price: number;
  stockQuantity: number;
  bookId: string;
}
export interface CardTable {
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
export interface CategoryTable {
  id: string;
  name: string;
}
export interface CustomerTable {
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
  dateOfBirth: string;
  deliveryAddressId: string;
  billingAddressId: string;
  isActive: boolean;
}
