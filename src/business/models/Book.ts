import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Author } from "./Author";
import { BookSku } from "./BookSku";
import { Category } from "./Category";

@Entity({ name: "book" })
export class Book {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "pk_book" })
  id!: string;

  @Column()
  title!: string;

  @Column()
  cover!: string;

  @Column()
  description!: string;

  @ManyToMany(() => Author, (author) => author.books)
  @JoinTable({
    name: "book_authors",
    joinColumn: { name: "book_id", foreignKeyConstraintName: "fk_book_author" },
    inverseJoinColumn: {
      name: "author_id",
      foreignKeyConstraintName: "fk_author_book",
    },
  })
  authors!: Author[];

  @ManyToMany(() => Category, (category) => category.books)
  @JoinTable({
    name: "book_categories",
    joinColumn: {
      name: "book_id",
      foreignKeyConstraintName: "fb_book_category",
    },
    inverseJoinColumn: {
      name: "category_id",
      foreignKeyConstraintName: "fk_category_book",
    },
  })
  categories!: Category[];

  @OneToMany(() => BookSku, (sku) => sku.book)
  skus!: BookSku[];

  @Column({ name: "bookmark_style", nullable: true })
  bookmarkStyle?: string;
}
