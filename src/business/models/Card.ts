import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customer } from "./Customer";

export enum CardFlag {
  MasterCard = "mastercard",
  Visa = "visa",
  Amex = "amex",
  Discover = "discover",
  DinersClub = "dinersclub",
  JCB = "jcb",
  Elo = "elo",
}

export const cardFlagText = {
  [CardFlag.MasterCard]: "MasterCard",
  [CardFlag.Visa]: "Visa",
  [CardFlag.Amex]: "American Express",
  [CardFlag.Discover]: "Discover",
  [CardFlag.DinersClub]: "Diners Club",
  [CardFlag.JCB]: "JCB",
  [CardFlag.Elo]: "Elo",
};

export const cardNumberValidation = {
  [CardFlag.MasterCard]: (number: string) =>
    number.match(/^5[1-5][0-9]{14}/) !== null,
  [CardFlag.Visa]: (number: string) =>
    number.match(/^4[0-9]{12}(?:[0-9]{3})/) !== null,
  [CardFlag.Amex]: (number: string) => number.match(/^3[47][0-9]{13}/) !== null,
  [CardFlag.Discover]: (number: string) =>
    number.match(/^6(?:011|5[0-9]{2})[0-9]{12}/) !== null,
  [CardFlag.DinersClub]: (number: string) =>
    number.match(/^3(?:0[0-5]|[68][0-9])[0-9]{11}/) !== null,
  [CardFlag.JCB]: (number: string) =>
    number.match(/^(?:2131|1800|35\d{3})\d{11}/) !== null,
  [CardFlag.Elo]: (number: string) =>
    number.match(
      /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
    ) !== null,
};

@Entity({ name: "card" })
export class Card {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "pk_card" })
  id!: string;

  @Column()
  number: string;

  @ManyToOne(() => Customer, (customer) => customer.cards)
  @JoinColumn({
    name: "customer_id",
    foreignKeyConstraintName: "fk_card_customer",
  })
  customer: Customer;

  @Column({ name: "holder_name" })
  holderName: string;

  @Column({
    type: "enum",
    enum: CardFlag,
    enumName: "card_flag",
  })
  flag: CardFlag;

  @Column({
    length: "3",
  })
  cvv: string;

  @Column({
    length: "2",
    name: "month_of_validity",
  })
  monthOfValidity: string;

  @Column({
    length: "4",
    name: "year_of_validity",
  })
  yearOfValidity: string;

  @Column({ default: true })
  active: boolean;

  public constructor(
    customer: Customer,
    number: string,
    holderName: string,
    flag: CardFlag,
    cvv: string,
    monthOfValidity: string,
    yearOfValidity: string,
  ) {
    this.number = number;
    this.customer = customer;
    this.holderName = holderName;
    this.flag = flag;
    this.cvv = cvv;
    this.monthOfValidity = monthOfValidity;
    this.yearOfValidity = yearOfValidity;
    this.active = true;
  }
}
