import { User } from "src/modules/auth/entities/auth.entity";
import { Book } from "src/modules/book/entities/book.entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Review {
   @PrimaryGeneratedColumn()
   id: number

   @ManyToOne(() => User, (user) => user.review, { onDelete: 'CASCADE', nullable: false })
   @JoinColumn({ name: 'userId' })
   user: User

   @ManyToOne(() => Book, (book) => book.review, { onDelete: 'CASCADE', nullable: false })
   @JoinColumn({ name: 'bookId' })
   book: Book

   @Column({ type: 'int', nullable: true })
   rating: number

   @Column({ type: 'varchar', nullable: true })
   comment: string
}