import { ExecutionContext, CanActivate, Injectable, BadRequestException, NotFoundException, ForbiddenException } from "@nestjs/common";
import { ReviewService } from "src/modules/review/review.service";


@Injectable()
export class ReviewOwnerGuard implements CanActivate {

   constructor(private readonly reviewService: ReviewService) { }

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const reviewId = request.params.reviewId;
      const userId = request.user?.id;

      if (!reviewId) {
         throw new BadRequestException('ReviewId is missing!');
      }

      const review = await this.reviewService.findReviewById(reviewId);
      if (!review) {
         throw new NotFoundException('Review Not Found!');
      }

      if (String(userId) !== String(review.user.id)) {
         throw new ForbiddenException('Access Denied. As u do not owned this review!');
      }

      return true;
   }
}