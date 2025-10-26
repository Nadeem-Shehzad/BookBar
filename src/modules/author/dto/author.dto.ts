import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class AuthorDTO {
   @IsNotEmpty({ message: 'Author ID Required' })
   @IsNumber()
   id: number

   @IsNotEmpty({ message: 'Author Name Required' })
   @IsString()
   name: string

   @IsNotEmpty({ message: 'Author Email Required' })
   @IsEmail()
   email: string
}