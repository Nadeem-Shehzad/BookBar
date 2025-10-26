import { forwardRef, Module } from "@nestjs/common";
import { UserModule } from "src/modules/user/user.module";
import { UserService } from "src/modules/user/user.service";
import { EmailValidator } from "./validators/email-validator";
import { JwtAuthGuard } from "./guards/jwt-auth-guard";
import { JwtModule } from "@nestjs/jwt";
import { RoleCheckGuard } from "./guards/role-check.guard";
import { OwnerShipGuard } from "./guards/ownership.guard";
import { BookModule } from "src/modules/book/book.module";
import { BookService } from "src/modules/book/book.service";
import { BookOwnerShipGuard } from "./guards/book-ownership.guard";


@Module({
   imports: [
      JwtModule.register({}),
      forwardRef(() => UserModule),
      BookModule
   ],
   providers: [UserService, BookService, EmailValidator, JwtAuthGuard, RoleCheckGuard, OwnerShipGuard, BookOwnerShipGuard],
   exports: [EmailValidator, JwtAuthGuard, RoleCheckGuard, OwnerShipGuard, BookOwnerShipGuard]
})

export class CommonModule { }