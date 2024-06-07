import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book";

@Entity({ name: "category" })
export class Category {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "pk_category" })
  id!: string;

  @Column()
  name!: string;

  @ManyToMany(() => Book, (book) => book.categories)
  @JoinColumn({ name: "book_id" })
  books!: Book[];
}
