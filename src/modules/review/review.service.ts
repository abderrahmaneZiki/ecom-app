import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ReviewEntity from 'src/entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {

    constructor(@InjectRepository(ReviewEntity) private readonly reviewRepository:Repository<ReviewEntity>){}

    async deleteReview(id){
        const review=await this.reviewRepository.findOne({where:{id:id}});
        if(review){
            await this.reviewRepository.remove(review);
            throw new HttpException('SUCCESS',HttpStatus.OK);
        }
        throw new HttpException('ERROR',HttpStatus.BAD_REQUEST);

    }
}
