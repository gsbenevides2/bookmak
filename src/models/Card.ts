import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";

export enum CardFlag {
  MasterCard = "mastercard",
  Visa = "visa",
}

@Entity()
export class Card {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  number: string;

  @ManyToOne(() => Customer, (customer) => customer.cards)
  customer: Customer;

  @Column()
  holderName: string;

  @Column({
    type: "enum",
    enum: CardFlag,
  })
  flag: CardFlag;

  @Column()
  cvv: string;

  @Column()
  monthOfValidity: string;

  @Column()
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
