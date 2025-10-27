import {
   Body, Controller, Delete, Get, Param, ParseIntPipe,
   Post, Put, UseGuards, UseInterceptors
} from "@nestjs/common";
import { ReviewService } from "./review.service";
import { ResponseInterceptor } from "src/common/interceptors/response.interceptor";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { GetUserID } from "src/common/decorators/get-user-id";
import { ReviewDTO } from "./dto/review.dto";
import { UserData } from "src/common/decorators/user-data";
import { ReviewUserDTO } from "./dto/user.dto";
import { BookDataGuard } from "src/common/guards/book-data.guard";
import { ReviewDataGuard } from "src/common/guards/review-data.guard";
import { ReviewOwnerGuard } from "src/common/guards/review-owner.guard";


@Controller('review')
@UseInterceptors(ResponseInterceptor)
@UseGuards(JwtAuthGuard)
export class ReviewController {

   constructor(private readonly reviewService: ReviewService) { }

   @Get()
   getUserReviews(@GetUserID() id: number) {
      return this.reviewService.getUserReviews(id);
   }

   @Get(':bookId')
   @UseGuards(BookDataGuard)
   getBookReviews(@Param('bookId', ParseIntPipe) bookId: number) {
      return this.reviewService.getBookReviews(bookId);
   }

   @Post(':bookId')
   @UseGuards(BookDataGuard)
   addReviews(@Body() review: ReviewDTO, @UserData() user: ReviewUserDTO, @Param('bookId', ParseIntPipe) bookId: number) {
      return this.reviewService.addReviews(review, user, bookId);
   }

   @Get('avg/:bookId')
   @UseGuards(BookDataGuard)
   getBookAvgRating(@Param('bookId', ParseIntPipe) bookId: number) {
      return this.reviewService.getBookAvgRating(bookId);
   }

   @Put(':reviewId')
   @UseGuards(ReviewDataGuard, ReviewOwnerGuard)
   updateReview(@Param('reviewId', ParseIntPipe) reviewId: number, @Body() newData: ReviewDTO) {
      return this.reviewService.updateReview(reviewId, newData);
   }

   @Delete(':reviewId')
   @UseGuards(ReviewDataGuard, ReviewOwnerGuard)
   deleteReview(@Param('reviewId', ParseIntPipe) reviewId: number) {
      return this.reviewService.deleteReview(reviewId);
   }
}