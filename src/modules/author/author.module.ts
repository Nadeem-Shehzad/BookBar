import { Module } from "@nestjs/common";
import { AuthorController } from "./author.controller";
import { AuthorService } from "./author.service";
import { JwtModule } from "@nestjs/jwt";
import { CommonModule } from "src/common/common.module";
import { JwtAuthGuard } from "src/common/guards/jwt-auth-guard";
import { BookOwnerShipGuard } from "src/common/guards/book-ownership.guard";
import { RoleCheckGuard } from "src/common/guards/role-check.guard";
import { BookModule } from "../book/book.module";


@Module({
   imports: [
      JwtModule.register({}),
      BookModule,
      CommonModule
   ],
   controllers: [AuthorController],
   providers: [AuthorService, JwtAuthGuard, RoleCheckGuard, BookOwnerShipGuard]
})

export class AuthorModule { }