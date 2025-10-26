import {
   Body, Controller, Delete, Get, Param, ParseIntPipe,
   Post, Put, UseGuards, UseInterceptors
} from "@nestjs/common";
import { AuthorService } from "./author.service";
import { ResponseInterceptor } from "src/common/interceptors/response.interceptor";
import { JwtAuthGuard } from "src/common/guards/jwt-auth-guard";
import { BookDTO } from "./dto/book.dto";
import { AuthorData } from "src/common/decorators/author-data";
import { AuthorDTO } from "./dto/author.dto";
import { Roles } from "src/common/decorators/user-roles";
import { RoleCheckGuard } from "src/common/guards/role-check.guard";
import { UpdateBookDTO } from "./dto/update-book.dto";
import { BookOwnerShipGuard } from "src/common/guards/book-ownership.guard";


@Controller('book')
@UseInterceptors(ResponseInterceptor)
@UseGuards(JwtAuthGuard, RoleCheckGuard)
export class AuthorController {
   constructor(private readonly authorService: AuthorService) { }

   @Get('all')
   @Roles('Author')
   getAuthorBooks() {
      return this.authorService.getAuthorBooks();
   }

   @Post('add')
   @Roles('Author')
   addBook(@Body() bookData: BookDTO, @AuthorData() author: AuthorDTO) {
      return this.authorService.addBook(bookData, author);
   }

   @Put(':id')
   @Roles('Author')
   @UseGuards(BookOwnerShipGuard)
   updateBook(@Param('id', ParseIntPipe) id: number, @Body() bookData: UpdateBookDTO) {
      return this.authorService.updateBook(id, bookData);
   }

   @Delete(':id')
   @Roles('Author')
   @UseGuards(BookOwnerShipGuard)
   deleteBook(@Param('id', ParseIntPipe) id: number) {
      return this.authorService.deleteBook(id);
   }
}