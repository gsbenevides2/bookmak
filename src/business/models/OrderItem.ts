import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./Order";
import { BookSku } from "./BookSku";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  quantity!: number;

  @Column()
  unitSellPrice!: number;

  @Column({
    nullable: true,
  })
  inExchange?: boolean;

  @ManyToOne(() => BookSku)
  @JoinColumn()
  sku!: BookSku;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn()
  order!: Order;
}
