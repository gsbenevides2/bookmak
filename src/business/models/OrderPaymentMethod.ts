import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Card } from "./Card";
import { Coupon } from "./Coupon";
import { Order } from "./Order";

@Entity()
export class OrderPaymentMethod {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "pk_order_payment_method",
  })
  id!: string;

  @Column()
  value!: number;

  @ManyToOne(() => Card)
  @JoinColumn({
    name: "card_id",
    foreignKeyConstraintName: "fk_order_payment_method_card",
  })
  card?: Card;

  @ManyToOne(() => Coupon)
  @JoinColumn({
    name: "coupon_id",
    foreignKeyConstraintName: "fk_order_payment_method_coupon",
  })
  coupon?: Coupon;

  @ManyToOne(() => Order, (order) => order.usedPaymentMethods)
  @JoinColumn({
    name: "order_id",
    foreignKeyConstraintName: "fk_order_payment_method",
  })
  order!: Order;
}
