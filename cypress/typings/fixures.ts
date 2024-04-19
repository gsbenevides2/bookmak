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
export interface AuthorFixureData {
  id: string;
  name: string;
}
export interface BookAuthorFixureData {
  authorId: string;
  bookId: string;
}
export interface BookCategoryFixureData {
  categoryId: string;
  bookId: string;
}
export interface BookSkuFixureData {
  id: string;
  title: string;
  cover: string;
  description: string;
  price: number;
  stockQuantity: number;
  bookId: string;
}
export interface BookFixureData {
  id: string;
  title: string;
  cover: string;
  description: string;
}
export interface CardFixureData {
  number: string;
  holderName: string;
  flag: string;
  cvv: string;
  monthOfValidity: string;
  yearOfValidity: string;
  active: boolean;
}
export interface CategoryFixureData {
  id: string;
  name: string;
}
export interface UserFixureData {
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
