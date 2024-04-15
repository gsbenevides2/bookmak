import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Author } from "./Author";
import { Category } from "./Category";
import { BookSku } from "./BookSku";

@Entity()
export class Book {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  cover!: string;

  @Column()
  description!: string;

  @ManyToMany(() => Author)
  @JoinTable({ name: "book_authors" })
  authors!: Author[];

  @ManyToMany(() => Category)
  @JoinTable({ name: "book_categories" })
  categories!: Category[];

  @OneToMany(() => BookSku, (sku) => sku.book)
  skus!: BookSku[];

  @Column({ nullable: true })
  bookmarkStyle?: string;
}
