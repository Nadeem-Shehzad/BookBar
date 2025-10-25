import { Module } from "@nestjs/common";
import { UserModule } from "src/modules/user/user.module";
import { UserService } from "src/modules/user/user.service";
import { EmailValidator } from "./validators/email-validator";
import { JwtAuthGuard } from "./guards/jwt-auth-guard";
import { JwtModule } from "@nestjs/jwt";


@Module({
   imports: [
      JwtModule.register({}),
      UserModule
   ],
   providers: [UserService, EmailValidator, JwtAuthGuard],
   exports: [EmailValidator, JwtAuthGuard]
})

export class CommonModule { }