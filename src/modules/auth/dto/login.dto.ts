import { IsDefined, IsEmail, IsNotEmpty, IsString } from "class-validator";


export class LoginDTO {
   @IsDefined({ message: 'Email Requried!' })
   @IsNotEmpty({ message: 'Email Requried!' })
   @IsEmail()
   email: string

   @IsDefined({ message: 'Password Requried!' })
   @IsNotEmpty({ message: 'Password Requried!' })
   @IsString()
   password: string
}