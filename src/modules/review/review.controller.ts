import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { ReviewService } from './review.service';

@Controller('work-space/review')
export class ReviewController {

    constructor(private reviewService:ReviewService){}


     @Delete('/:id')
     @UseGuards(new AuthGuard())
     async deleteReview(@Param('id') id:string){
        return await this.reviewService.deleteReview(id)
     }
}
