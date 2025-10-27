import { User } from "src/modules/auth/entities/auth.entity";
import { Review } from "src/modules/review/entities/review.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum BooksCategory {
   IT = 'IT',
   Business = 'Business',
   Tech = 'Tech',
   ENTERTAINMENT = 'Etertainment'
}

@Entity()
export class Book {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ type: 'varchar', nullable: false })
   title: string

   @Column({ type: 'varchar', nullable: false })
   description: string

   @Column({ type: 'int', nullable: false })
   price: number

   @ManyToOne(() => User, (user) => user.books, {
      nullable: false,
      onDelete: 'CASCADE'
   })
   @JoinColumn({ name: 'authorId' })
   author: User

   @Column({
      type: 'enum',
      enum: BooksCategory,
      default: BooksCategory.ENTERTAINMENT
   })
   category: BooksCategory

   @OneToMany(() => Review, (review) => review.book)
   review: Review
}