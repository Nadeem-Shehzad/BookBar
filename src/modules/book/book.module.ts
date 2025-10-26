import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "./entities/book.entities";
import { BookService } from "./book.service";
import { BookController } from "./book.controller";


@Module({
   imports: [
      TypeOrmModule.forFeature([Book])
   ],
   controllers: [BookController],
   providers: [BookService],
   exports: [TypeOrmModule, BookService]
})

export class BookModule { }