import { 
   CanActivate, ExecutionContext, 
   ForbiddenException, 
   Injectable, NotFoundException 
} from "@nestjs/common";
import { BookService } from "src/modules/book/book.service";


@Injectable()
export class BookOwnerShipGuard implements CanActivate {

   constructor(private readonly bookService: BookService) {}

   async canActivate(context: ExecutionContext): Promise<boolean>  {
      const request = context.switchToHttp().getRequest();
      const authorId = request.user?.id;
      const bookId = request.params.id;

      if (!authorId || !bookId) {
         throw new ForbiddenException('Access denied. missing Author or BookID!')
      }

      const book = await this.bookService.findBookById(bookId);
      if(!book){
         throw new NotFoundException('Book Not Found!');
      }
      
      if(String(authorId) !== String(book.author.id)){
         throw new ForbiddenException('Access denied: You are not the author of this book.');
      }
      
      return true;
   }
}