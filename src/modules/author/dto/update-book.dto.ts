import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { BooksCategory } from 'src/modules/book/entities/book.entities';


export class UpdateBookDTO {
   @IsOptional()
   @IsString()
   title?: string;

   @IsOptional()
   @IsString()
   description?: string;

   @IsOptional()
   @IsNumber()
   price?: number;

   @IsOptional()
   @IsEnum(BooksCategory, { message: 'Category must be one of: IT, Business, Tech, Entertainment' })
   category?: BooksCategory;
}
