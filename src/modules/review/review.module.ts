import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ReviewEntity from 'src/entities/review.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ReviewEntity])],
  providers: [ReviewService],
  controllers: [ReviewController]
})
export class ReviewModule {}
