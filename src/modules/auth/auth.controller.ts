import {
   Body,
   Controller,
   HttpCode,
   HttpStatus,
   Post,
   UseInterceptors,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { ResponseInterceptor } from "src/common/interceptors/response.interceptor";
import { UserDTO } from "./dto/user.dto";
import { LoginDTO } from "./dto/login.dto";


@Controller('auth')
@UseInterceptors(ResponseInterceptor)
export class AuthController {
   constructor(private readonly authService: AuthService) { }

   @Post('register')
   @HttpCode(HttpStatus.CREATED)
   async registerUser(@Body() userData: UserDTO) {
      return this.authService.userRegistration(userData);
   }

   @Post('login')
   @HttpCode(HttpStatus.OK)
   async loginUser(@Body() userData: LoginDTO) {
      return this.authService.userLogin(userData);
   }

}