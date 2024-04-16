import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./Order";

export enum OrderStatus {
  PROCESSING = "processing",
  PAYMENT_APPROVED = "payment_approved",
  PAYMENT_REJECTED = "payment_rejected",
  PREPARING = "preparing",
  SENDING = "sending",
  SENDED = "sended",
  EXCHANGING = "exchanging",
  EXCHANGED = "exchanged",
  EXCHANGE_REJECTED = "exchange_rejected",
}

export const orderStatusText = {
  [OrderStatus.PROCESSING]: "Em processamento",
  [OrderStatus.PAYMENT_APPROVED]: "Pagamento aprovado",
  [OrderStatus.PAYMENT_REJECTED]: "Pagamento recusado",
  [OrderStatus.PREPARING]: "Em preparação",
  [OrderStatus.SENDING]: "Em transporte",
  [OrderStatus.SENDED]: "Entregue",
  [OrderStatus.EXCHANGING]: "Em troca",
  [OrderStatus.EXCHANGED]: "Trocado",
  [OrderStatus.EXCHANGE_REJECTED]: "Troca recusada",
};

@Entity()
export class OrderUpdate {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "enum",
    enum: OrderStatus,
  })
  status!: OrderStatus;

  @Column()
  observations!: string;

  @Column({
    default: () => "CURRENT_TIMESTAMP",
    type: "timestamp with time zone",
  })
  timestamp!: Date;

  @ManyToOne(() => Order, (order) => order.updates)
  @JoinColumn()
  order!: Order;
}
