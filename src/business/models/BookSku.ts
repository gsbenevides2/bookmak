import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book";

@Entity({ name: "book_sku" })
export class BookSku {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "pk_book_sku" })
  id!: string;

  @Column()
  title!: string;

  @Column()
  cover!: string;

  @Column()
  description!: string;

  @Column()
  price!: number;

  @Column({ name: "stock_quantity" })
  stockQuantity!: number;

  @ManyToOne(() => Book, (book) => book.skus)
  @JoinColumn({ name: "book_id", foreignKeyConstraintName: "fk_book_sku" })
  book!: Book;

  @Column({ name: "is_active", default: true })
  isActive!: boolean;
}
