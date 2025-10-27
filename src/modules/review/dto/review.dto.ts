import { IsNumber, IsOptional, IsString } from "class-validator";


export class ReviewDTO {
   @IsOptional()
   @IsNumber()
   rating: number

   @IsOptional()
   @IsString()
   comment: string
}