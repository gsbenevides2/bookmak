import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./Address";
import { OrderItem } from "./OrderItem";
import { Customer } from "./Customer";
import { OrderUpdate } from "./OrderUpdate";
import { OrderPaymentMethod } from "./OrderPaymentMethod";

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column({ default: 0 })
  subtotal!: number;
  @Column({ default: 0 })
  totalPrice!: number;
  @Column({ default: 0 })
  discounts!: number;
  @Column({ default: 0 })
  shippingPrice!: number;
  @Column({ nullable: true })
  bookmarkStyle?: string;
  @Column({ nullable: true })
  bookmarkText?: string;
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items!: OrderItem[];
  @OneToMany(() => OrderUpdate, (orderUpdate) => orderUpdate.order)
  updates!: OrderUpdate[];
  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn()
  customer?: Customer;
  @OneToOne(() => Address)
  @JoinColumn()
  billingAddress?: Address;
  @OneToOne(() => Address)
  @JoinColumn()
  shippingAddress?: Address;

  @Column({
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
