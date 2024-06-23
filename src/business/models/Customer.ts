import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Address } from "./Address";
import { Card } from "./Card";
import { Coupon } from "./Coupon";
import { Order } from "./Order";

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

@Entity({ name: "customer" })
export class Customer {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "pk_customer" })
  id!: string;

  @Unique("unique_email", ["email"])
  @Column()
  email: string;

  @Column()
  name: string;

  @Unique("unique_cpf", ["cpf"])
  @Column()
  cpf: string;

  @Column({ name: "date_of_birth" })
  dateOfBirth!: Date;

  @Column({
    type: "enum",
    enum: Gender,
    enumName: "gender",
  })
  gender: Gender;

  @Column({
    enum: PhoneType,
    type: "enum",
    enumName: "phone_type",
    name: "phone_type",
  })
  phoneType: PhoneType;

  @Column({ name: "phone_area_code" })
  phoneAreaCode: string;

  @Column({ name: "phone_number" })
  phoneNumber: string;

  @Column({ name: "is_active" })
  isActive: boolean;

  @Column({ name: "password_hash" })
  passwordHash!: string;

  @OneToMany(() => Address, (address) => address.customer)
  addresses: Address[];

  @OneToMany(() => Card, (card) => card.customer)
  cards: Card[];

  @OneToOne(() => Address, {
    nullable: false,
  })
  @JoinColumn({
    name: "delivery_address_id",
    foreignKeyConstraintName: "fk_customer_delivery_address",
  })
  deliveryAddress: Address;

  @OneToOne(() => Address, {
    nullable: false,
  })
  @JoinColumn({
    name: "billing_address_id",
    foreignKeyConstraintName: "fk_customer_billing_address",
  })
  billingAddress: Address;

  @OneToMany(() => Coupon, (coupon) => coupon.attachedCustomer)
  attachedCoupons!: Coupon[];

  @Column({
    default: false,
    name: "is_admin",
  })
  isAdmin!: boolean;

  @OneToMany(() => Order, (order) => order.customer)
  orders!: Order[];

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
    this.addresses = addresses;
    this.cards = cards;
    this.billingAddress = billingAddress;
    this.deliveryAddress = deliveryAddress;
  }
}
