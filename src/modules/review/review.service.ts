import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Review } from "./entities/review.entity";
import { ReviewDTO } from "./dto/review.dto";
import { ReviewUserDTO } from "./dto/user.dto";


@Injectable()
export class ReviewService {

   constructor(@InjectRepository(Review) private reviewRepo: Repository<Review>) { }

   async getUserReviews(id: number): Promise<Review[]> {
      return await this.reviewRepo.find({
         where: { user: { id } },
         relations: ['book'],
         select: {
            id: true,
            rating: true,
            comment: true,
            book: {
               title: true,
               category: true
            }
         }
      });
   }


   async getBookReviews(id: number): Promise<Review[]> {
      return await this.reviewRepo.find({
         where: { book: { id } },
         relations: ['user'],
         select: {
            id: true,
            rating: true,
            comment: true,
            user: {
               name: true
            }
         }
      });
   }


   async getBookAvgRating(bookId: number): Promise<{ avg: number, total: number }> {
      const result = await this.reviewRepo
         .createQueryBuilder('review')
         .select('AVG(review.rating)', 'avg')
         .addSelect('COUNT(review.id)', 'total')
         .where('review.bookId = :bookId', { bookId })
         .getRawOne();

      return {
         avg: result && result.avg ? parseFloat(result.avg) : 0,
         total: result && result.total ? parseInt(result.total, 10) : 0
      };
   }


   async addReviews(review: ReviewDTO, user: ReviewUserDTO, bookId: number) {
      const newReview = {
         ...review,
         user,
         book: { id: bookId }
      }

      const addedReview = this.reviewRepo.create(newReview);
      return await this.reviewRepo.save(addedReview);
   }


   async findReviewById(reviewId: number) {
      const review = await this.reviewRepo.findOne({
         where: { id: reviewId },
         relations: ['user']
      });
      return review;
   }


   async updateReview(reviewId: number, newData: ReviewDTO) {
      const review = await this.reviewRepo.findOne({ where: { id: reviewId } });
      if (!review) {
         throw new NotFoundException('User to Update not Found!');
      }

      Object.assign(review, newData);

      return await this.reviewRepo.save(review);
   }


   async deleteReview(id: number) {
      return await this.reviewRepo.delete({ id });
   }
}