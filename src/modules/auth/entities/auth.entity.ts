import { Book } from "src/modules/book/entities/book.entities";
import { Review } from "src/modules/review/entities/review.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";


export enum UserRole {
   ADMIN = 'Admin',
   USER = 'User',
   AUTHOR = 'Author'
}

@Entity()
export class User {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ type: 'varchar', nullable: false })
   name: string

   @Column({ type: 'varchar', nullable: false })
   email: string

   @Column({ type: 'varchar', nullable: false })
   password: string

   @Column({
      type: 'enum',
      enum: UserRole,
      default: UserRole.USER
   })
   role: UserRole

   @OneToOne(() => Review, (review) => review.user)
   review: Review

   @OneToMany(() => Book, (book) => book.author)
   books: Book[]
}