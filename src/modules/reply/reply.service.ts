import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ReplyEntity from 'src/entities/reply.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReplyService {

constructor(@InjectRepository(ReplyEntity) private readonly replyRepository:Repository<ReplyEntity>){}

    async deleteReply(id){
         let reply=await   this.replyRepository.findOne({where:{id}});
         if(reply){
             return await this.replyRepository.remove(reply);
         }
    }
}
