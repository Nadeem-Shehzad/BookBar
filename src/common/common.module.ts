import { forwardRef, Module } from "@nestjs/common";
import { UserModule } from "src/modules/user/user.module";
import { UserService } from "src/modules/user/user.service";
import { EmailValidator } from "./validators/email-validator";
import { JwtAuthGuard } from "./guards/jwt-auth-guard";
import { JwtModule } from "@nestjs/jwt";
import { RoleCheckGuard } from "./guards/role-check.guard";
import { OwnerShipGuard } from "./guards/ownership.guard";


@Module({
   imports: [
      JwtModule.register({}),
      forwardRef(() => UserModule),
   ],
   providers: [UserService, EmailValidator, JwtAuthGuard, RoleCheckGuard, OwnerShipGuard],
   exports: [EmailValidator, JwtAuthGuard, RoleCheckGuard, OwnerShipGuard]
})

export class CommonModule { }