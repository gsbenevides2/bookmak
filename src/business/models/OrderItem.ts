import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BookSku } from "./BookSku";
import { Order } from "./Order";

@Entity({ name: "order_item" })
export class OrderItem {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "pk_order_item" })
  id!: string;

  @Column()
  quantity!: number;

  @Column({ name: "unit_sell_price" })
  unitSellPrice!: number;

  @ManyToOne(() => BookSku)
  @JoinColumn({
    name: "sku_id",
    foreignKeyConstraintName: "fk_order_item_sku",
  })
  sku!: BookSku;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: "order_id", foreignKeyConstraintName: "fk_order_item" })
  order!: Order;

  @Column({
    default: 0,
    name: "change_quantity",
  })
  changeQuantity!: number;
}
