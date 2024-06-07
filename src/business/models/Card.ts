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
}

export const cardFlagText = {
  [CardFlag.MasterCard]: "MasterCard",
  [CardFlag.Visa]: "Visa",
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
