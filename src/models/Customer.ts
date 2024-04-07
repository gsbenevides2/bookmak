import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Address } from "./Address";
import { Card } from "./Card";
import { Coupon } from "./Coupon";

export enum Gender {
  Male = "male",
  Female = "female",
  Uniformed = "uniformed",
  Others = "others",
}

export enum PhoneType {
  Cellphone = "cellphone",
  Landline = "landline",
}

@Entity()
export class Customer {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Unique("unique_email", ["email"])
  @Column()
  email: string;

  @Column()
  name: string;

  @Unique("unique_cpf", ["cpf"])
  @Column()
  cpf: string;

  @Column()
  dateOfBirth!: Date;

  @Column({
    type: "enum",
    enum: Gender,
  })
  gender: Gender;

  @Column({
    enum: PhoneType,
    type: "enum",
  })
  phoneType: PhoneType;

  @Column()
  phoneAreaCode: string;

  @Column()
  phoneNumber: string;

  @Column()
  isActive: boolean;

  @Column()
  password: string;

  @OneToMany(() => Address, (address) => address.customer)
  addresses: Address[];

  @OneToMany(() => Card, (card) => card.customer)
  cards: Card[];

  @OneToOne(() => Address, { nullable: false })
  @JoinColumn()
  deliveryAddress: Address;

  @OneToOne(() => Address, { nullable: false })
  @JoinColumn()
  billingAddress: Address;

  @OneToMany(() => Coupon, (coupon) => coupon.attachedCustomer)
  @JoinColumn()
  attachedCoupons!: Coupon[];

  @Column({
    default: false,
  })
  isAdmin!: boolean;

  public constructor(
    email: string,
    name: string,
    cpf: string,
    dateOfBirth: Date,
    gender: Gender,
    phoneType: PhoneType,
    phoneAreaCode: string,
    phoneNumber: string,
    isActive: boolean,
    password: string,
    addresses: Address[],
    cards: Card[],
    billingAddress: Address,
    deliveryAddress: Address,
  ) {
    this.email = email;
    this.name = name;
    this.cpf = cpf;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.phoneType = phoneType;
    this.phoneAreaCode = phoneAreaCode;
    this.phoneNumber = phoneNumber;
    this.isActive = isActive;
    this.password = password;
    this.addresses = addresses;
    this.cards = cards;
    this.billingAddress = billingAddress;
    this.deliveryAddress = deliveryAddress;
  }
}
