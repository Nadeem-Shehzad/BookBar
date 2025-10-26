import { IsDefined, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { BooksCategory } from "src/modules/book/entities/book.entities";


export class BookDTO {
   @IsDefined({ message: 'Title Required!' })
   @IsNotEmpty()
   @IsString()
   title: string

   @IsDefined({ message: 'Description Required!' })
   @IsNotEmpty()
   @IsString()
   description: string

   @IsDefined({ message: 'Price Required!' })
   @IsNotEmpty()
   @IsNumber()
   price: number

   @IsDefined({ message: 'Category Required!' })
   @IsNotEmpty()
   @IsEnum(BooksCategory, { message: 'Category must be one of: IT, Business, Tech, Entertainment' })
   category: BooksCategory
}