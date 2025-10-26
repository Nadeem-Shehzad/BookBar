import { Controller, Get, Param, ParseIntPipe, Query, UseInterceptors } from "@nestjs/common";
import { BookService } from "./book.service";
import { ResponseInterceptor } from "src/common/interceptors/response.interceptor";
import { BooksCategory } from "./entities/book.entities";


@Controller('public')
@UseInterceptors(ResponseInterceptor)
export class BookController {

   constructor(private readonly bookService: BookService) { }

   @Get('all-books')
   async getAllBooks() {
      return await this.bookService.getAllBooks();
   }

   @Get('book/:id')
   async getBookDetails(@Param('id', ParseIntPipe) id: number) {
      return await this.bookService.getBookDetails(id);
   }

   @Get('category')
   async getBooksByCategory(@Query('type') category: BooksCategory) {
      return await this.bookService.getBooksByCategory(category);
   }
}