import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { ReplyService } from './reply.service';

@Controller('work-space/reply')
export class ReplyController {
    constructor(private replyService:ReplyService){}


    @Delete('/:id')
   // @UseGuards(new AuthGuard())
    async deleteReview(@Param('id') id:string){
       return await this.replyService.deleteReply(id)
    }
}
