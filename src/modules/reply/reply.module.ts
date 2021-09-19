import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ReplyEntity from 'src/entities/reply.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ReplyEntity])],
  providers: [ReplyService],
  controllers: [ReplyController]
})
export class ReplyModule {}
