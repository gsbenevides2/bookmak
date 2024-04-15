import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Card } from "./Card";
import { Coupon } from "./Coupon";
import { Order } from "./Order";

@Entity()
export class OrderPaymentMethod {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column()
  value!: string;
  @ManyToOne(() => Card)
  card?: Card;
  @ManyToOne(() => Coupon)
  coupon?: Coupon;
  @ManyToOne(() => Order, (order) => order.usedPaymentMethods)
  order!: Order;
}
