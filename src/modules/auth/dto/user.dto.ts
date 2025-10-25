import { Transform } from "class-transformer";
import { IsDefined, IsEmail, IsNotEmpty, IsString, Validate } from "class-validator";
import { EmailValidator } from "src/common/validators/email-validator";


export class UserDTO {
   @IsDefined({ message: 'Name Required!' })
   @IsNotEmpty({ message: 'Name Required!' })
   @IsString()
   name: string

   @IsDefined({ message: 'Email Required!' })
   @IsNotEmpty({ message: 'Email Required!' })
   @IsEmail()
   @Validate(EmailValidator)
   email: string

   @IsDefined({ message: 'Password Required!' })
   @IsNotEmpty({ message: 'Password Required!' })
   @IsString()
   password: string

   @IsString()
   @Transform(({ value }) => value ?? 'user')
   role: string
}