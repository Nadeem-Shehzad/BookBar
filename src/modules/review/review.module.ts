import { forwardRef, Module } from "@nestjs/common";
import { ReviewController } from "./review.controller";
import { ReviewService } from "./review.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./entities/review.entity";
import { CommonModule } from "src/common/common.module";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { JwtModule } from "@nestjs/jwt";
import { BookDataGuard } from "src/common/guards/book-data.guard";
import { BookModule } from "../book/book.module";
import { ReviewDataGuard } from "src/common/guards/review-data.guard";
import { ReviewOwnerGuard } from "src/common/guards/review-owner.guard";


@Module({
   imports: [
      TypeOrmModule.forFeature([Review]),
      JwtModule.register({}),
      forwardRef(() => CommonModule),
      BookModule
   ],
   controllers: [ReviewController],
   providers: [ReviewService, JwtAuthGuard, BookDataGuard, ReviewDataGuard, ReviewOwnerGuard],
   exports: [ReviewService, TypeOrmModule]
})

export class ReviewModule { }