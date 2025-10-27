import { ExecutionContext, CanActivate, Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { BookService } from "src/modules/book/book.service";


@Injectable()
export class BookDataGuard implements CanActivate {

   constructor(private readonly bookService: BookService) {}

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const bookId = request.params.bookId;

      if(!bookId) {
         throw new BadRequestException('BookId is missing!');
      }

      const book = await this.bookService.findBookById(bookId);
      if(!book){
         throw new NotFoundException('Book Not Found!');
      }

      return true;
   }
}