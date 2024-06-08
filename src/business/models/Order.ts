import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./Address";
import { Customer } from "./Customer";
import { OrderItem } from "./OrderItem";
import { OrderPaymentMethod } from "./OrderPaymentMethod";
import { OrderUpdate } from "./OrderUpdate";

@Entity({ name: "order" })
export class Order {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "pk_order" })
  id!: string;

  @Column({ default: 0 })
  subtotal!: number;

  @Column({ default: 0, name: "total_price" })
  totalPrice!: number;

  @Column({ default: 0 })
  discounts!: number;

  @Column({ default: 0, name: "shipping_price" })
  shippingPrice!: number;

  @Column({ default: false, name: "shipping_is_available" })
  shippingIsAvailable!: boolean;

  @Column({ nullable: true, name: "bookmark_style" })
  bookmarkStyle?: string;

  @Column({ nullable: true, name: "bookmark_text" })
  bookmarkText?: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items!: OrderItem[];

  @OneToMany(() => OrderUpdate, (orderUpdate) => orderUpdate.order)
  @JoinColumn({ name: "order_id", foreignKeyConstraintName: "fk_order_update" })
  @JoinTable({ name: "order_update" })
  updates!: OrderUpdate[];

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({
    name: "customer_id",
    foreignKeyConstraintName: "fk_order_customer",
  })
  customer?: Customer;

  @ManyToOne(() => Address)
  @JoinColumn({
    name: "billing_address_id",
    foreignKeyConstraintName: "fk_order_billing_address",
  })
  billingAddress?: Address;

  @ManyToOne(() => Address)
  @JoinColumn({
    name: "shipping_address_id",
    foreignKeyConstraintName: "fk_order_shipping_address",
  })
  shippingAddress?: Address;

  @Column({
    name: "generated_bookmarks",
    array: true,
    type: "text",
    default: () => "ARRAY[]::text[]",
  })
  generatedBookmarks!: string[];

  @OneToMany(
    () => OrderPaymentMethod,
    (orderPaymentMethod) => orderPaymentMethod.order,
  )
  usedPaymentMethods!: OrderPaymentMethod[];
}
