import { forwardRef, Module } from "@nestjs/common";
import { UserModule } from "src/modules/user/user.module";
import { UserService } from "src/modules/user/user.service";
import { EmailValidator } from "./validators/email-validator";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { JwtModule } from "@nestjs/jwt";
import { RoleCheckGuard } from "./guards/role-check.guard";
import { OwnerShipGuard } from "./guards/ownership.guard";
import { BookModule } from "src/modules/book/book.module";
import { BookService } from "src/modules/book/book.service";
import { BookOwnerShipGuard } from "./guards/book-ownership.guard";
import { BookDataGuard } from "./guards/book-data.guard";
import { ReviewModule } from "src/modules/review/review.module";
import { ReviewService } from "src/modules/review/review.service";
import { ReviewDataGuard } from "./guards/review-data.guard";
import { ReviewOwnerGuard } from "./guards/review-owner.guard";


@Module({
   imports: [
      JwtModule.register({}),
      forwardRef(() => UserModule),
      BookModule,
      forwardRef(() => ReviewModule) 
   ],
   providers: [
      UserService, BookService, ReviewService,
      EmailValidator, JwtAuthGuard,
      RoleCheckGuard, OwnerShipGuard, BookOwnerShipGuard,
      BookDataGuard, ReviewDataGuard, ReviewOwnerGuard
   ],
   exports: [EmailValidator, JwtAuthGuard, RoleCheckGuard,
      OwnerShipGuard, BookOwnerShipGuard, BookDataGuard, 
      ReviewDataGuard, ReviewOwnerGuard
   ]
})

export class CommonModule { }