import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class ReviewUserDTO {

   @IsNotEmpty({ message: 'Name Required!' })
   @IsNumber()
   id: number

   @IsNotEmpty({ message: 'Name Required!' })
   @IsString()
   name: string

   @IsNotEmpty({ message: 'Email Required!' })
   @IsEmail()
   email: string
}