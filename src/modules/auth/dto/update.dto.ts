import { IsOptional, IsString } from "class-validator";


export class UpdateProfileDTO {
   @IsOptional()
   @IsString()
   name: string
}