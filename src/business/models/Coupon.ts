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

export const couponsText: Record<CouponType, string> = {
  discount: "Desconto",
  exchange: "Troca",
};

@Entity({ name: "coupon" })
export class Coupon {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "pk_coupon" })
  id!: string;

  @Column()
  code!: string;

  @Column()
  value!: number;

  @Column()
  description!: string;

  @Column({
    type: "enum",
    enum: CouponType,
    enumName: "coupon_type",
  })
  type!: CouponType;

  @Column({
    default: false,
  })
  used: boolean = false;

  @ManyToOne(() => Customer, (customer) => customer.attachedCoupons)
  @JoinColumn({
    name: "attached_customer_id",
    foreignKeyConstraintName: "fk_coupon_customer",
  })
  attachedCustomer?: Customer;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt!: Date;
}
