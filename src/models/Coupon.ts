import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customer } from "./Customer";

export enum CouponType {
  Discount = "discount",
  Exchange = "exchange",
}

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  code!: string;

  @Column()
  value!: number;

  @Column({
    type: "enum",
    enum: CouponType,
  })
  type!: CouponType;

  @Column({
    default: false,
  })
  used: boolean = false;

  @ManyToOne(() => Customer, (customer) => customer.attachedCoupons)
  @JoinColumn()
  attachedCustomer?: Customer;
}
