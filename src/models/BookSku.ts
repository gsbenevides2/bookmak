import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book";

@Entity()
export class BookSku {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  cover!: string;

  @Column()
  description!: string;

  @Column()
  price!: number;

  @Column()
  stockQuantity!: number;

  @ManyToOne(() => Book, (book) => book.skus)
  @JoinColumn()
  book!: Book;
}
