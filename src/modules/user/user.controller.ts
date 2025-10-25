import { 
   Body, Controller, Delete, Get, HttpCode, HttpStatus, 
   Put, UseGuards, UseInterceptors 
} from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "src/common/guards/jwt-auth-guard";
import { GetUserID } from "src/common/decorators/get-user-id";
import { ResponseInterceptor } from "src/common/interceptors/response.interceptor";
import { UpdateProfileDTO } from "../auth/dto/update.dto";
import { RoleCheckGuard } from "src/common/guards/role-check.guard";
import { Roles } from "src/common/decorators/user-roles";
import { OwnerShipGuard } from "src/common/guards/ownership.guard";


@Controller('user')
@UseInterceptors(ResponseInterceptor)
@UseGuards(JwtAuthGuard, RoleCheckGuard)
export class UserController {
   constructor(private readonly userService: UserService) { }

   @Get('all-users')
   @Roles('Admin')
   async getAllUsers() {
      return this.userService.allUsers();
   }
   
   @Get('profile')
   @HttpCode(HttpStatus.OK)
   async userProfile(@GetUserID() id: number) {
      return this.userService.findById(id);
   }
   
   @Put(':userId')
   @UseGuards(OwnerShipGuard)
   @HttpCode(HttpStatus.OK)
   updateProfile(@GetUserID() id: number, @Body() dataToUpdate: UpdateProfileDTO) {
      return this.userService.updateProfile(id, dataToUpdate);
   }

   @Delete()
   @HttpCode(HttpStatus.OK)
   deleteUser(@GetUserID() id: number) {
      return this.userService.deleteUser(id);
   }
}