import { ExecutionContext, CanActivate, Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { ReviewService } from "src/modules/review/review.service";


@Injectable()
export class ReviewDataGuard implements CanActivate {

   constructor(private readonly reviewService: ReviewService) { }

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const reviewId = request.params.reviewId;

      if (!reviewId) {
         throw new BadRequestException('ReviewId is missing!');
      }

      const review = await this.reviewService.findReviewById(reviewId);
      if (!review) {
         throw new NotFoundException('Review Not Found!');
      }

      return true;
   }
}