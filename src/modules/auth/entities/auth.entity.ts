import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


export enum UserRole {
   ADMIN = 'Admin',
   USER = 'User'
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
   role: string
}