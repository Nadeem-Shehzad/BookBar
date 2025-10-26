import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Book, BooksCategory } from "./entities/book.entities";


@Injectable()
export class BookService {
   constructor(@InjectRepository(Book) private bookRepo: Repository<Book>) { }

   async getAllBooks(): Promise<Book[]> {
      return await this.bookRepo.find({
         relations: ['author'],
         select: {
            id: true,
            title: true,
            description: true,
            price: true,
            category: true,
            author: {
               name: true
            }
         }
      });
   }


   async getBookDetails(id: number): Promise<Book | null> {
      const book = await this.bookRepo.findOne({
         where: { id },
         relations: ['author'],
         select: {
            id: true,
            title: true,
            description: true,
            price: true,
            category: true,
            author: {
               name: true
            }
         }
      });

      if (!book) {
         throw new NotFoundException('Book Not Found!');
      }

      return book;
   }


   async getBooksByCategory(category: BooksCategory): Promise<Book[]> {
      const books = await this.bookRepo.find({
         where: { category },
         relations: ['author'],
         select: {
            id: true,
            title: true,
            description: true,
            price: true,
            category: true,
            author: {
               name: true
            }
         }
      });

      return books;
   }


   async findBookById(id: number): Promise<Book | null> {
      const book = await this.bookRepo.findOne({
         where: { id },
         relations: ['author']
      });
      return book;
   }
}