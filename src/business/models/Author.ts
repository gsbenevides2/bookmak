import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book";

@Entity({ name: "author" })
export class Author {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "pk_author" })
  id!: string;

  @Column()
  name!: string;

  @ManyToMany(() => Book, (book) => book.authors)
  @JoinColumn({ name: "book_id" })
  books!: Book[];
}
