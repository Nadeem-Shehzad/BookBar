import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "../book/entities/book.entities";
import { DeleteResult, Repository } from "typeorm";
import { BookDTO } from "./dto/book.dto";
import { AuthorDTO } from "./dto/author.dto";
import { UpdateBookDTO } from "./dto/update-book.dto";


@Injectable()
export class AuthorService {

   constructor(
      @InjectRepository(Book) private bookRepo: Repository<Book>
   ) { }


   async getAuthorBooks(): Promise<Book[]> {
      return await this.bookRepo.find({
         relations: ['author'],
         select: {
            id: true,
            title: true,
            description: true,
            price: true,
            category: true,
            author: {
               name: true,
               email: true,
            },
         }
      });
   }


   async addBook(bookData: BookDTO, author: AuthorDTO): Promise<Book> {

      const newBook = {
         ...bookData,
         author
      }

      const book = this.bookRepo.create(newBook);
      return await this.bookRepo.save(book);
   }


   async updateBook(id: number, bookData: UpdateBookDTO): Promise<Book> {
      const book = await this.bookRepo.findOne({ where: { id } });
      if (!book) {
         throw new NotFoundException('Book not Found!');
      }

      Object.assign(book, bookData);
      return await this.bookRepo.save(book);
   }


   async deleteBook(id: number): Promise<DeleteResult> {
      return await this.bookRepo.delete(id);
   }
}